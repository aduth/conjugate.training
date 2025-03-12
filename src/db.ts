import Dexie, { type EntityTable } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

interface Activity {
  id: string;
  exercise: string;
  reps: number;
  weight: number;
  bandType: string | null;
  chainWeight: number;
  createdAt: Date;
}

interface Exercise {
  realmId: string;
  slug: string;
  name: string;
}

interface Database extends Dexie {
  activities: EntityTable<Activity, 'id'>;
  exercises: EntityTable<Exercise, 'name'>;
}

const db = new Dexie('conjugate', { addons: [dexieCloud] }) as Database;

db.version(1).stores({
  activities: '@id, exercise, bandType, chainWeight, createdAt',
  exercises: 'name, slug',
});

if (process.env.NODE_ENV !== 'test') {
  db.cloud.configure({
    databaseUrl: 'https://zejmcj630.dexie.cloud',
    requireAuth: false,
    customLoginGui: true,
  });
}

export { db, type Activity, type Exercise };
