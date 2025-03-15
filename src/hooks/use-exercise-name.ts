import { type Exercise, db } from '#db.ts';
import { useLiveQuery } from 'dexie-react-hooks';

function useExerciseName(slug?: string | null): string | null | undefined {
  const exercise = useLiveQuery<Exercise | null | undefined>(async () => {
    if (!slug) return null;
    const exercise = await db.exercises.get({ slug });
    return exercise ?? null;
  });

  if (exercise === null) return null;
  return exercise?.name;
}

export default useExerciseName;
