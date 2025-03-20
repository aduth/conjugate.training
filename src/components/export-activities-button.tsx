import { type ComponentProps } from 'react';
import { pick } from 'remeda';
import { type Activity, db } from '#db';
import { Button } from './ui/button';
import { useLiveQuery } from 'dexie-react-hooks';

type ExportActivitiesButtonProps = ComponentProps<'button'>;

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
  const count = useLiveQuery(() => db.activities.count(), []);

  if (!count) return null;

  async function exportActivities() {
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
  }

  return (
    <Button onClick={exportActivities} variant="outline" {...props}>
      Export Data
    </Button>
  );
}

export default ExportActivitiesButton;
