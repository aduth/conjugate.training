import { db } from '#db';
import useCachedLiveQuery from '#hooks/use-cached-live-query';
import { Activity } from 'lucide-react';
import { Link } from 'wouter';
import EmptyActivitiesState from './empty-activities-state';
import ListSkeleton from './list-skeleton';
import TwoColumnList, { TwoColumnListItem, TwoColumnListItemColumn } from './two-column-list';
import { Details, DetailsItem } from './ui/details';
import { getExerciseSlug } from '#entities/exercise';

function ExerciseList() {
  const exerciseCounts = useCachedLiveQuery('exerciseCounts', async () => {
    const counts: Record<string, number> = {};

    await db.activities.orderBy('exercise').eachKey((key) => {
      const exercise = key.toString();
      counts[exercise] ??= 0;
      counts[exercise]++;
    });

    return counts;
  });

  if (!exerciseCounts) return <ListSkeleton />;

  const entries = Object.entries(exerciseCounts);
  if (!entries.length) return <EmptyActivitiesState />;

  return (
    <TwoColumnList>
      {entries.map(([exercise, count]) => (
        <TwoColumnListItem key={exercise.toString()}>
          <TwoColumnListItemColumn className="flex-1 w-full text-left">
            <div className="font-medium truncate">
              <Link to={`/exercises/${getExerciseSlug(exercise.toString())}/`}>
                {exercise.toString()}
              </Link>
            </div>
          </TwoColumnListItemColumn>
          <TwoColumnListItemColumn>
            <Details>
              <DetailsItem icon={Activity} name="Activities">
                {count}
              </DetailsItem>
            </Details>
          </TwoColumnListItemColumn>
        </TwoColumnListItem>
      ))}
    </TwoColumnList>
  );
}

export default ExerciseList;
