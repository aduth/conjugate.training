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

interface Exercise {
  name: string;
  isCustom: boolean;
}

interface Database extends Dexie {
  activities: EntityTable<Activity, 'id'>;
  exercises: EntityTable<Exercise, 'name'>;
}

const db = new Dexie('conjugate') as Database;

db.version(1).stores({
  activities: '++id, exercise, bandType, chainWeight, createdAt',
  exercises: 'name',
});

export { db };
