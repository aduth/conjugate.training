import { useLiveQuery } from 'dexie-react-hooks';
import { Award, Calendar1 } from 'lucide-react';
import { db } from '#db.ts';
import FormattedWeight from './formatted-weight';
import FormattedDate from './formatted-date';
import { Details, DetailsItem } from './ui/details';

interface ExerciseInfoProps {
  name: string;

  reps?: number;

  chainWeight?: number;

  bandType?: string | null;
}

function useSortedFirst(
  name: string,
  sortKey: string,
  { reps, chainWeight, bandType }: Pick<ExerciseInfoProps, 'reps' | 'chainWeight' | 'bandType'>,
) {
  return useLiveQuery(
    async () =>
      (
        await db.activities
          .where({ exercise: name })
          .filter(
            (activity) =>
              activity.reps === reps &&
              activity.chainWeight === chainWeight &&
              activity.bandType === bandType,
          )
          .reverse()
          .sortBy(sortKey)
      )[0],
    [name, reps, chainWeight, bandType],
  );
}

function ExerciseInfo({ name, reps = 1, chainWeight = 0, bandType = null }: ExerciseInfoProps) {
  const best = useSortedFirst(name, 'weight', { reps, chainWeight, bandType });
  const latest = useSortedFirst(name, 'createdAt', { reps, chainWeight, bandType });

  if (!best && !latest) return null;

  return (
    <Details className="rounded-md border-1 border-input py-2 px-4">
      {best && (
        <DetailsItem icon={Award} name="Best">
          <FormattedWeight value={best.weight} />{' '}
          <span className="font-normal text-gray-500">
            (<FormattedDate value={best.createdAt} variant="short" />)
          </span>
        </DetailsItem>
      )}
      {latest && (
        <DetailsItem icon={Calendar1} name="Latest" className="text-left">
          <FormattedWeight value={latest.weight} />{' '}
          <span className="font-normal text-gray-500">
            (<FormattedDate value={latest.createdAt} variant="short" />)
          </span>
        </DetailsItem>
      )}
    </Details>
  );
}

export default ExerciseInfo;
