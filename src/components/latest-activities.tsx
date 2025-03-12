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
import { useState } from 'react';
import { times } from 'remeda';
import { Button } from './ui/button';
import { useLiveQuery } from 'dexie-react-hooks';

interface LatestActivitiesProps {
  exercise?: string;
}

interface LatestActivitiesPageProps {
  exercise?: string;
  page: number;
}

const PER_PAGE_SIZE = 20;

function LatestActivitiesPage({ exercise, page = 1 }: LatestActivitiesPageProps) {
  const [, navigate] = useLocation();
  const activities = useCachedLiveQuery(['activities', exercise ?? '', page.toString()], () => {
    let activities = db.activities.orderBy('createdAt').reverse();
    if (exercise) activities = activities.filter((activity) => activity.exercise === exercise);
    activities = activities.offset(page * PER_PAGE_SIZE).limit(PER_PAGE_SIZE);
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
                    onClick={() => navigate(`/activities/${activity.id}/edit`)}
                    className="p-2 -mr-2 text-gray-500 hover:text-red-400 cursor-pointer"
                    aria-label="Edit"
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

function LatestActivities({ exercise }: LatestActivitiesProps) {
  const [page, setPage] = useState(1);
  const count = useLiveQuery(
    () => (exercise ? db.activities.where({ exercise }).count() : db.activities.count()),
    [exercise],
  );

  return (
    <>
      {times(page, (i) => (
        <LatestActivitiesPage exercise={exercise} key={i} page={i} />
      ))}
      {count! > page * PER_PAGE_SIZE && (
        <Button variant="outline" onClick={() => setPage(page + 1)}>
          Load More
        </Button>
      )}
    </>
  );
}

export default LatestActivities;
