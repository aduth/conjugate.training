import { useLiveQuery } from 'dexie-react-hooks';
import { Award, Calendar1 } from 'lucide-react';
import { db } from '#db.ts';
import FormattedWeight from './formatted-weight';
import FormattedDate from './formatted-date';
import { Details, DetailsItem } from './ui/details';

interface ExerciseInfoProps {
  name: string;
}

function ExerciseInfo({ name }: ExerciseInfoProps) {
  const best = useLiveQuery(
    async () => (await db.activities.where({ exercise: name }).sortBy('weight')).at(-1),
    [name],
  );
  const latest = useLiveQuery(
    async () => (await db.activities.where({ exercise: name }).sortBy('createdAt')).at(-1),
    [name],
  );

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
