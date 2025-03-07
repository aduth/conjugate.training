import { db } from '#db.ts';
import useCachedLiveQuery from '#hooks/use-cached-live-query.ts';
import EmptyActivitiesState from './empty-activities-state';
import ListSkeleton from './list-skeleton';

function ExerciseList() {
  const exercises = useCachedLiveQuery('exercises', () =>
    db.activities.orderBy('exercise').uniqueKeys(),
  );

  if (!exercises) return <ListSkeleton />;
  if (!exercises.length) return <EmptyActivitiesState />;

  return (
    <ul>
      {exercises.map((exercise) => (
        <li key={exercise.toString()}>{exercise.toString()}</li>
      ))}
    </ul>
  );
}

export default ExerciseList;
