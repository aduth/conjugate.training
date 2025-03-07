import { liveQuery } from 'dexie';
import useSWRSubscription from 'swr/subscription';

const useCachedLiveQuery = <T>(
  key: string,
  querier: Parameters<typeof liveQuery<T>>[0],
): T | undefined => {
  const { data } = useSWRSubscription(
    ['cachedLiveQuery', key],
    ([], { next }) => liveQuery(querier).subscribe((data) => next(null, data)).unsubscribe,
  );

  return data;
};

export default useCachedLiveQuery;
