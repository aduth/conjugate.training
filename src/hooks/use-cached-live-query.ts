import { liveQuery } from 'dexie';
import useSWRSubscription from 'swr/subscription';
import toArray from '#lib/to-array.ts';

const useCachedLiveQuery = <T>(
  key: string | string[],
  querier: Parameters<typeof liveQuery<T>>[0],
): T | undefined => {
  const { data } = useSWRSubscription(
    ['cachedLiveQuery', ...toArray(key)],
    ([], { next }) => liveQuery(querier).subscribe((data) => next(null, data)).unsubscribe,
  );

  return data;
};

export default useCachedLiveQuery;
