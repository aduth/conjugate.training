import { db } from '#db.ts';
import { useLiveQuery } from 'dexie-react-hooks';
import ListSkeleton from './list-skeleton';

function ExerciseList() {
  const exercises = useLiveQuery(() => db.activities.orderBy('exercise').uniqueKeys());

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
