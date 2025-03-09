import useSWR from 'swr';
import { toKebabCase } from 'remeda';
import { type Exercise, db } from '#db';

interface ExerciseDataExercise {
  category: string;
  name: string;
}

interface ExerciseDataResponse {
  exercises: ExerciseDataExercise[];
}

const EXERCISE_LIMIT = 20;

const EXERCISE_DATA_URL =
  'https://raw.githubusercontent.com/exercemus/exercises/51b2a5c/minified-exercises.json';

const isStrengthExercise = (exercise: ExerciseDataExercise): boolean =>
  exercise.category === 'strength';

const isAccommodationVariation = (exercise: ExerciseDataExercise): boolean =>
  /with (Bands|Chains)$/.test(exercise.name);

const isIncludedExercise = (exercise: ExerciseDataExercise): boolean =>
  isStrengthExercise(exercise) && !isAccommodationVariation(exercise);

async function fetchExercisesFromSource(): Promise<ExerciseDataExercise[]> {
  if (process.env.NODE_ENV === 'test') return [];
  const response = await fetch(EXERCISE_DATA_URL);
  const data = (await response.json()) as ExerciseDataResponse;
  return data.exercises.filter(isIncludedExercise);
}

async function initializeExerciseDb(): Promise<void> {
  const count = await db.exercises.count();
  if (count > 0) {
    return;
  }

  const exercises = await fetchExercisesFromSource();
  const entities = exercises.map((exercise) => ({
    slug: toKebabCase(exercise.name),
    name: exercise.name,
    isCustom: false,
  }));

  await db.exercises.bulkAdd(entities);
}

async function fetchExercises(query?: string): Promise<Exercise[]> {
  await initializeExerciseDb();

  const filter = query
    ? db.exercises.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    : db.exercises;
  const results = await filter.limit(EXERCISE_LIMIT).toArray();

  return results;
}

function useExerciseData(query?: string): Exercise[] {
  const { data } = useSWR(`exercises/${query}`, () => fetchExercises(query), {
    keepPreviousData: true,
  });

  return data ?? [];
}

export default useExerciseData;
