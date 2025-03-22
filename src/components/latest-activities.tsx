import { useState } from 'react';
import { times } from 'remeda';
import { ChartNoAxesCombined, Shell, Weight, FilePen, LinkIcon } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '#db';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '#components/ui/tooltip';
import useCachedLiveQuery from '#hooks/use-cached-live-query';
import { getExerciseSlug } from '#entities/exercise';
import { Details, DetailsItem } from './ui/details';
import FormattedWeight from './formatted-weight';
import FormattedDate from './formatted-date';
import ListSkeleton from './list-skeleton';
import EmptyActivitiesState from './empty-activities-state';
import TwoColumnList, { TwoColumnListItem, TwoColumnListItemColumn } from './two-column-list';
import { Button } from './ui/button';

interface LatestActivitiesProps {
  exercise?: string;
  perPage?: number;
}

interface LatestActivitiesPageProps {
  exercise?: string;
  page: number;
  perPage: number;
}

const DEFAULT_PER_PAGE = 20;

function LatestActivitiesPage({ exercise, page, perPage }: LatestActivitiesPageProps) {
  const [, navigate] = useLocation();
  const activities = useCachedLiveQuery(['activities', exercise ?? '', page.toString()], () => {
    let activities = db.activities.orderBy('createdAt').reverse();
    if (exercise) activities = activities.filter((activity) => activity.exercise === exercise);
    activities = activities.offset(page * perPage).limit(perPage);
    return activities.toArray();
  });

  if (!activities) return <ListSkeleton />;
  if (!activities.length) return <EmptyActivitiesState />;

  return (
    <TwoColumnList>
      {activities.map((activity) => (
        <TwoColumnListItem key={activity.id}>
          <TwoColumnListItemColumn className="flex-1 w-full text-left">
            <div className="font-medium text-gray-900 flex items-center">
              <Link to={`/exercises/${getExerciseSlug(activity.exercise)}/`}>
                {activity.exercise}
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    type="button"
                    onClick={() => navigate(`/activities/${activity.id}/edit`)}
                    className="p-2 -mr-2 text-gray-500 hover:text-red-400 cursor-pointer"
                    aria-label={`Edit activity: ${activity.exercise}`}
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
                <DetailsItem icon={LinkIcon} name="Chain">
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

function LatestActivities({ exercise, perPage = DEFAULT_PER_PAGE }: LatestActivitiesProps) {
  const [page, setPage] = useState(1);
  const count = useLiveQuery(
    () => (exercise ? db.activities.where({ exercise }).count() : db.activities.count()),
    [exercise],
  );

  return (
    <>
      {times(page, (i) => (
        <LatestActivitiesPage exercise={exercise} key={i} page={i} perPage={perPage} />
      ))}
      {count! > page * perPage && (
        <Button variant="outline" onClick={() => setPage(page + 1)}>
          Load More
        </Button>
      )}
    </>
  );
}

export default LatestActivities;
