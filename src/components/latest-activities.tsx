import { ChartNoAxesCombined, Shell, Link, Weight, FilePen } from 'lucide-react';
import { useLocation } from 'wouter';
import { db } from '#db';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '#components/ui/tooltip';
import useCachedLiveQuery from '#hooks/use-cached-live-query';
import { Details, DetailsItem } from './ui/details';
import FormattedWeight from './formatted-weight';
import FormattedDate from './formatted-date';
import ListSkeleton from './list-skeleton';
import EmptyActivitiesState from './empty-activities-state';
import TwoColumnList, { TwoColumnListItem, TwoColumnListItemColumn } from './two-column-list';

interface LatestActivitiesProps {
  exercise?: string;
}

function LatestActivities({ exercise }: LatestActivitiesProps) {
  const [, navigate] = useLocation();
  const activities = useCachedLiveQuery(['activities', exercise ?? ''], () => {
    let activities = db.activities.orderBy('createdAt').reverse();
    if (exercise) activities = activities.filter((activity) => activity.exercise === exercise);
    return activities.toArray();
  });

  if (!activities) return <ListSkeleton />;
  if (!activities.length) return <EmptyActivitiesState />;

  return (
    <TwoColumnList>
      {activities.map((activity) => (
        <TwoColumnListItem key={activity.id}>
          <TwoColumnListItemColumn className="flex-1 w-full text-left">
            <div className="font-medium text-gray-900 truncate flex items-center">
              {activity.exercise}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    type="button"
                    onClick={() => navigate(`/edit/${activity.id}`)}
                    className="p-2 -mr-2 text-gray-500 hover:text-red-400 cursor-pointer"
                  >
                    <FilePen size="16" />
                  </TooltipTrigger>
                  <TooltipContent sideOffset={-10}>Edit</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-sm text-gray-500 truncate">
              <FormattedDate value={activity.createdAt} />
            </div>
          </TwoColumnListItemColumn>
          <TwoColumnListItemColumn>
            <Details className="self-start">
              <DetailsItem icon={ChartNoAxesCombined} name="Reps">
                {activity.reps}
              </DetailsItem>
              {activity.bandType && (
                <DetailsItem icon={Shell} name="Band">
                  {activity.bandType}
                </DetailsItem>
              )}
              {activity.chainWeight > 0 && (
                <DetailsItem icon={Link} name="Chain">
                  <FormattedWeight value={activity.chainWeight} />
                </DetailsItem>
              )}
              {activity.weight > 0 && (
                <DetailsItem icon={Weight} name="Weight">
                  <FormattedWeight value={activity.weight} />
                </DetailsItem>
              )}
            </Details>
          </TwoColumnListItemColumn>
        </TwoColumnListItem>
      ))}
    </TwoColumnList>
  );
}

export default LatestActivities;
