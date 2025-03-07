import { db } from '#db.ts';
import useCachedLiveQuery from '#hooks/use-cached-live-query.ts';
import ListSkeleton from './list-skeleton';

function ExerciseList() {
  const exercises = useCachedLiveQuery('exercises', () =>
    db.activities.orderBy('exercise').uniqueKeys(),
  );

  if (!exercises) return <ListSkeleton />;

  return (
    <ul>
      {exercises.map((exercise) => (
        <li key={exercise.toString()}>{exercise.toString()}</li>
      ))}
    </ul>
  );
}

export default ExerciseList;
