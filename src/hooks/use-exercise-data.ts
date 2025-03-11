import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { toKebabCase } from 'remeda';
import Fuzzy from '@leeoniya/ufuzzy';
import { db } from '#db';

interface ExerciseDataExercise {
  category: string;
  name: string;
}

interface ExerciseDataResponse {
  exercises: ExerciseDataExercise[];
}

const fuzzy = new Fuzzy({ intraMode: 1 });

const EXERCISE_LIMIT = 20;

export const EXERCISE_DATA_URL =
  'https://raw.githubusercontent.com/exercemus/exercises/51b2a5c/minified-exercises.json';

const isStrengthExercise = (exercise: ExerciseDataExercise): boolean =>
  exercise.category === 'strength';

const isAccommodationVariation = (exercise: ExerciseDataExercise): boolean =>
  /^Band (?!Assisted)|with (Band|Chain)s?$/i.test(exercise.name);

export const isIncludedExercise = (exercise: ExerciseDataExercise): boolean =>
  isStrengthExercise(exercise) && !isAccommodationVariation(exercise);

async function fetchExercisesFromSource(): Promise<ExerciseDataExercise[]> {
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

async function fetchAllExercises(): Promise<string[]> {
  await initializeExerciseDb();
  return db.exercises.toCollection().primaryKeys();
}

function fetchExercises(query: string, allExercises: string[]): string[] {
  const [, info, order] = fuzzy.search(allExercises, query);
  return info && order
    ? order.slice(0, EXERCISE_LIMIT).map((i) => allExercises[info.idx[order[i]]])
    : [];
}

function useExerciseData(query?: string): string[] {
  const { data: allExercises } = useSWRImmutable('exercises', () => fetchAllExercises());
  const { data: filteredExercises } = useSWR(
    allExercises && query ? `exercises/${query}` : null,
    () => fetchExercises(query!, allExercises!),
    { keepPreviousData: true },
  );

  const exercises = query ? filteredExercises : allExercises?.slice(0, EXERCISE_LIMIT);
  return exercises ?? [];
}

export default useExerciseData;
