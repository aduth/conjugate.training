import useSWR from 'swr';
import Fuzzy from '@leeoniya/ufuzzy';
import { db } from '#db';
import useCachedLiveQuery from './use-cached-live-query';

const fuzzy = new Fuzzy({ intraMode: 1 });

const EXERCISE_LIMIT = 20;

function fetchAllExercises(): Promise<string[]> {
  return db.exercises.toCollection().primaryKeys();
}

function fetchExercises(query: string, allExercises: string[]): string[] {
  const [, info, order] = fuzzy.search(allExercises, query);
  return info && order
    ? order.slice(0, EXERCISE_LIMIT).map((i) => allExercises[info.idx[order[i]]])
    : [];
}

function useExerciseData(query?: string): string[] {
  const allExercises = useCachedLiveQuery('exercises', () => fetchAllExercises());
  const { data: filteredExercises } = useSWR(
    allExercises && query ? ['exercises', query, allExercises] : null,
    ([, query, allExercises]) => fetchExercises(query, allExercises),
    { keepPreviousData: true },
  );

  const exercises = query ? filteredExercises : allExercises?.slice(0, EXERCISE_LIMIT);
  return exercises ?? [];
}

export default useExerciseData;
