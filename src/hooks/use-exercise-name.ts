import { type Exercise, db } from '#db.ts';
import { useLiveQuery } from 'dexie-react-hooks';

function useExerciseName(slug?: string | null): string | null {
  const exercise = useLiveQuery<Exercise | null | undefined>(() => {
    return slug ? db.exercises.get({ slug }) : null;
  });

  return exercise?.name ?? null;
}

export default useExerciseName;
