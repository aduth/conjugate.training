import useSWR from 'swr';
import { db } from '../db';

interface ExerciseDataExercise {
  category: string;
  name: string;
}

interface ExerciseDataResponse {
  exercises: ExerciseDataExercise[];
}

const EXERCISE_DATA_URL =
  'https://raw.githubusercontent.com/exercemus/exercises/51b2a5c/minified-exercises.json';

const isStrengthExercise = (exercise: ExerciseDataExercise): boolean =>
  exercise.category === 'strength';

const isAccommodationVariation = (exercise: ExerciseDataExercise): boolean =>
  /with (Bands|Chains)$/.test(exercise.name);

const isIncludedExercise = (exercise: ExerciseDataExercise): boolean =>
  isStrengthExercise(exercise) && !isAccommodationVariation(exercise);

async function fetchExercisesFromDb(): Promise<string[] | null> {
  const exercises = await db.exercises.toArray();
  return exercises.length ? exercises.map((exercise) => exercise.name) : null;
}

async function fetchAndSaveExercisesFromSource(): Promise<string[]> {
  const response = await fetch(EXERCISE_DATA_URL);
  const data = (await response.json()) as ExerciseDataResponse;
  const exercises = data.exercises.filter(isIncludedExercise).map(({ name }) => name);
  db.exercises.bulkAdd(exercises.map((name) => ({ name, isCustom: false })));

  return exercises;
}

const fetchExercises = async (): Promise<string[]> =>
  (await fetchExercisesFromDb()) || (await fetchAndSaveExercisesFromSource());

function useExerciseData(): string[] | undefined {
  const { data } = useSWR('exercises', fetchExercises);

  return data;
}

export default useExerciseData;
