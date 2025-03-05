import Dexie, { type EntityTable } from 'dexie';

interface Activity {
  id: number;
  exercise: string;
  reps: number;
  weight: number;
  bandType: string | null;
  chainWeight: number;
  createdAt: Date;
}

interface Database extends Dexie {
  activities: EntityTable<Activity, 'id'>;
}

const db = new Dexie('conjugate') as Database;

db.version(1).stores({
  activities: '++id, exercise, bandType, chainWeight',
});

export { db };
