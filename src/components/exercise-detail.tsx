import { useMemo } from 'react';
import { LineChart, CartesianGrid, XAxis, Line, LabelList, YAxis } from 'recharts';
import { useLiveQuery } from 'dexie-react-hooks';
import { prop, sortBy } from 'remeda';
import { db } from '#db';
import ListSkeleton from './list-skeleton';
import LatestActivities from './latest-activities';
import { formatDate } from './formatted-date';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

interface ExerciseDetailProps {
  slug: string;
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const roundToInterval = (number: number, interval: number): number =>
  Math.round(number / interval) * interval;

function ExerciseDetail({ slug }: ExerciseDetailProps) {
  const exercise = useLiveQuery(() => db.exercises.get({ slug }));
  const activities = useLiveQuery(
    () =>
      exercise
        ? db.activities
            .where({ exercise: exercise.name })
            .filter(({ reps, bandType, chainWeight }) => reps === 1 && !bandType && !chainWeight)
            .sortBy('createdAt')
        : [],
    [exercise],
  );
  const domain = useMemo(() => {
    const sortedActivities = sortBy(activities ?? [], prop('weight'));

    return [
      roundToInterval(Math.max(sortedActivities[0]?.weight - 10, 0), 10),
      roundToInterval((sortedActivities.at(-1)?.weight ?? 0) + 10, 10),
    ];
  }, [activities]);

  if (!exercise) return <ListSkeleton />;

  return (
    <>
      {activities && activities.length > 0 && (
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
            <YAxis
              dataKey="weight"
              tickLine={false}
              axisLine={false}
              tickMargin={16}
              domain={domain}
            />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatDate({ value, variant: 'short' })}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="weight"
              type="natural"
              stroke="black"
              strokeWidth={2}
              dot={{
                fill: 'fill-foreground',
              }}
            >
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Line>
          </LineChart>
        </ChartContainer>
      )}
      <LatestActivities exercise={exercise.name} />
    </>
  );
}

export default ExerciseDetail;
