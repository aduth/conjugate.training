import { useLiveQuery } from 'dexie-react-hooks';
import { Award, Calendar1 } from 'lucide-react';
import { db } from '#db';
import { getEstimatedWeight } from '#lib/estimator';
import useSettings from '#hooks/use-settings';
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
  {
    reps,
    chainWeight,
    bandType,
  }: Pick<ExerciseInfoProps, 'reps' | 'chainWeight' | 'bandType'> = {},
) {
  return useLiveQuery(
    async () =>
      (
        await db.activities
          .where({ exercise: name })
          .filter(
            (activity) =>
              (reps === undefined || activity.reps === reps) &&
              (chainWeight === undefined || activity.chainWeight === chainWeight) &&
              (bandType === undefined || activity.bandType === bandType),
          )
          .reverse()
          .sortBy(sortKey)
      )[0],
    [name, reps, chainWeight, bandType],
  );
}

function ExerciseInfo({ name, reps = 1, chainWeight = 0, bandType = null }: ExerciseInfoProps) {
  const [settings] = useSettings();
  const best = useSortedFirst(name, 'weight', { reps, chainWeight, bandType });
  const bestAllReps = useSortedFirst(name, 'weight', { bandType, chainWeight });
  const latest = useSortedFirst(name, 'createdAt', { reps, chainWeight, bandType });
  const latestAllReps = useSortedFirst(name, 'createdAt', { chainWeight, bandType });

  let estimated;
  if (!chainWeight && !bandType && best?.reps !== reps && bestAllReps) {
    estimated = getEstimatedWeight(reps, bestAllReps, settings?.maxRepFormula);
  }

  if (!best && !bestAllReps && !latest && !estimated) return null;

  return (
    <Details className="rounded-md border-1 border-input py-2 px-4 items-center">
      {best && (
        <DetailsItem icon={Award} name="Best">
          <FormattedWeight value={best.weight} />{' '}
          <span className="font-normal text-gray-500">
            (<FormattedDate value={best.createdAt} variant="short" />)
          </span>
        </DetailsItem>
      )}
      {!best && bestAllReps && (
        <DetailsItem
          icon={Award}
          name={`Best (${bestAllReps.reps}RM)`}
          className="text-right only:text-center"
        >
          <FormattedWeight value={bestAllReps.weight} />{' '}
          <span className="font-normal text-gray-500">
            (<FormattedDate value={bestAllReps.createdAt} variant="short" />)
          </span>
        </DetailsItem>
      )}
      {latest && (
        <DetailsItem icon={Calendar1} name="Latest" className="justify-self-start">
          <FormattedWeight value={latest.weight} />{' '}
          <span className="font-normal text-gray-500">
            (<FormattedDate value={latest.createdAt} variant="short" />)
          </span>
        </DetailsItem>
      )}
      {!latest && latestAllReps && (
        <DetailsItem
          icon={Calendar1}
          name={`Latest (${latestAllReps.reps}RM)`}
          className="text-right only:text-center"
        >
          <FormattedWeight value={latestAllReps.weight} />{' '}
          <span className="font-normal text-gray-500">
            (<FormattedDate value={latestAllReps.createdAt} variant="short" />)
          </span>
        </DetailsItem>
      )}
      {estimated && (
        <DetailsItem icon={Calendar1} name="Estimated" className="justify-self-start">
          <FormattedWeight value={estimated} />
        </DetailsItem>
      )}
    </Details>
  );
}

export default ExerciseInfo;
