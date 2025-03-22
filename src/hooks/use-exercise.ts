import { type Exercise, db } from '#db';
import { useLiveQuery } from 'dexie-react-hooks';

function useExercise(slug?: string | null): Exercise | null | undefined {
  const exercise = useLiveQuery<Exercise | null | undefined>(async () => {
    if (!slug) return null;
    const exercise = await db.exercises.get({ slug });
    return exercise ?? null;
  });

  return exercise;
}

export default useExercise;
