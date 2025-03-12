interface ExerciseDataExercise {
  category: string;
  name: string;
}

interface ExerciseDataResponse {
  exercises: ExerciseDataExercise[];
}

export const EXERCISE_DATA_URL =
  'https://raw.githubusercontent.com/exercemus/exercises/51b2a5c/minified-exercises.json';

const isStrengthExercise = (exercise: ExerciseDataExercise): boolean =>
  exercise.category === 'strength';

const isAccommodationVariation = (exercise: ExerciseDataExercise): boolean =>
  /^Band (?!Assisted)|with (Band|Chain)s?$/i.test(exercise.name);

export const isIncludedExercise = (exercise: ExerciseDataExercise): boolean =>
  isStrengthExercise(exercise) && !isAccommodationVariation(exercise);

export async function fetchExercises(): Promise<ExerciseDataExercise[]> {
  const response = await fetch(EXERCISE_DATA_URL);
  const data = (await response.json()) as ExerciseDataResponse;
  return data.exercises.filter(isIncludedExercise);
}
