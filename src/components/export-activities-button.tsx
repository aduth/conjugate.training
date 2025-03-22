import { useActionState, type ComponentProps } from 'react';
import { Loader2 } from 'lucide-react';
import { pick } from 'remeda';
import { type Activity, db } from '#db';
import useCachedLiveQuery from '#hooks/use-cached-live-query';
import { Button } from './ui/button';

type ExportActivitiesButtonProps = ComponentProps<'form'>;

function download(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function toCSVValue(value: any) {
  if (value == null) return '';
  return '' + value;
}

export function toCSV(rows: string[][]): string {
  const quote = (str: string) => (str.includes(',') ? `"${str.replace(/"/g, '""')}"` : str);
  return rows.map((row) => row.map(quote).join(',')).join('\n');
}

function ExportActivitiesButton(props: ExportActivitiesButtonProps) {
  const count = useCachedLiveQuery('activity-count', () => db.activities.count());
  const [, formAction, isPending] = useActionState(async () => {
    const headers: (keyof Activity)[] = [
      'exercise',
      'reps',
      'weight',
      'chainWeight',
      'bandType',
      'createdAt',
    ];

    const activities = await db.activities.toArray();
    const data: any[][] = [
      ['Exercise', 'Reps', 'Weight', 'Chain Weight', 'Band Type', 'Date'],
      ...activities.map((activity) => Object.values(pick(activity, headers)).map(toCSVValue)),
    ];

    download(new Blob([toCSV(data)], { type: 'text/csv' }), 'activities.csv');
  }, null);

  if (!count) return null;

  return (
    <form action={formAction} {...props}>
      <Button
        type="submit"
        variant="outline"
        aria-busy={isPending}
        aria-disabled={isPending}
        aria-label={isPending ? 'Exporting' : undefined}
      >
        {isPending && <Loader2 className="animate-spin" aria-hidden />}
        Export Data
      </Button>
    </form>
  );
}

export default ExportActivitiesButton;
