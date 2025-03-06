import { db } from '#db.ts';
import { useLiveQuery } from 'dexie-react-hooks';

function ExerciseList() {
  const exercises = useLiveQuery(() => db.activities.orderBy('exercise').uniqueKeys());

  return (
    <ul>
      {exercises?.map((exercise) => <li key={exercise.toString()}>{exercise.toString()}</li>)}
    </ul>
  );
}

export default ExerciseList;
