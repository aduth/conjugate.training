import { useMemo } from 'react';
import {
  type DotProps,
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
  LabelList,
  YAxis,
  Dot,
} from 'recharts';
import { useLiveQuery } from 'dexie-react-hooks';
import { prop, sortBy } from 'remeda';
import { type Activity, db } from '#db';
import { getEstimatedWeight } from '#lib/estimator';
import { formatDate } from './formatted-date';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import cn from '#lib/class-names.ts';

interface ExerciseDetailChartProps {
  exercise: string;
}

interface EstimatedActivity extends Activity {
  isEstimate?: true;

  label?: string;
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const roundToInterval = (number: number, interval: number): number =>
  Math.round(number / interval) * interval;

function ExerciseDetailChartDot({
  cx,
  cy,
  stroke,
  payload,
  fill,
  r,
  strokeWidth,
}: DotProps & { payload?: EstimatedActivity }) {
  const classes = cn({ 'stroke-amber-600': payload?.isEstimate });

  return (
    <Dot
      cx={cx}
      cy={cy}
      r={r}
      stroke={stroke}
      fill={fill}
      strokeWidth={strokeWidth}
      className={classes}
    ></Dot>
  );
}

function ExerciseDetailChart({ exercise }: ExerciseDetailChartProps) {
  const activities = useLiveQuery<EstimatedActivity[]>(async () => {
    if (!exercise) return [];
    const result = await db.activities
      .where({ exercise })
      .filter(({ bandType, chainWeight }) => !bandType && !chainWeight)
      .sortBy('createdAt');

    return result.map((activity) => {
      if (activity.reps > 1) {
        const estimate = getEstimatedWeight(1, activity)!;
        return { ...activity, label: `~${estimate}`, weight: estimate, isEstimate: true };
      }

      return { ...activity, label: activity.weight.toString() };
    });
  }, [exercise]);
  const domain = useMemo(() => {
    const sortedActivities = sortBy(activities ?? [], prop('weight'));

    return [
      roundToInterval(Math.max(sortedActivities[0]?.weight - 10, 0), 10),
      roundToInterval((sortedActivities.at(-1)?.weight ?? 0) + 10, 10),
    ];
  }, [activities]);

  if (!activities || !activities.length) return null;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
        accessibilityLayer
        data={activities}
        margin={{
          top: 20,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis dataKey="weight" tickLine={false} axisLine={false} tickMargin={16} domain={domain} />
        <XAxis
          dataKey="createdAt"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => formatDate({ value, variant: 'short' })}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, _name, _item, _index, payload) => {
                const activity = payload as unknown as EstimatedActivity;
                return (
                  <div className="flex flex-col">
                    <div className="flex gap-x-1">
                      <span className="">Weight</span>
                      <span className="text-foreground font-mono font-semibold tabular-nums">
                        {value.toLocaleString()}
                      </span>
                    </div>
                    {activity.isEstimate && (
                      <div className="text-muted-foreground">
                        (Estimated from {activity.reps}RM)
                      </div>
                    )}
                  </div>
                );
              }}
            />
          }
        />
        <Line
          dataKey="weight"
          type="natural"
          stroke="black"
          strokeWidth={2}
          dot={<ExerciseDetailChartDot />}
        >
          <LabelList
            dataKey="label"
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
}

export default ExerciseDetailChart;
