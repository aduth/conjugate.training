import useExercise from './use-exercise';

function useExerciseName(slug?: string | null): string | null | undefined {
  const exercise = useExercise(slug);

  if (exercise === null) return null;
  return exercise?.name;
}

export default useExerciseName;
