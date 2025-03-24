import Dexie from 'dexie';
import dexieCloud, { type DBSyncedObject, type DexieCloudTable } from 'dexie-cloud-addon';

interface Activity extends Partial<DBSyncedObject> {
  id: string;
  exercise: string;
  reps: number;
  weight: number;
  bandType: string | null;
  chainWeight: number;
  createdAt: Date;
}

interface Exercise extends Partial<DBSyncedObject> {
  slug: string;
  name: string;
}

interface Settings extends Partial<DBSyncedObject> {
  id: string;
  unit?: 'lbs' | 'kgs';
}

interface Database extends Dexie {
  activities: DexieCloudTable<Activity, 'id'>;
  exercises: DexieCloudTable<Exercise, 'name'>;
  settings: DexieCloudTable<Settings, 'id'>;
}

const db = new Dexie('conjugate', { addons: [dexieCloud] }) as Database;

db.version(1).stores({
  activities: '@id, exercise, bandType, chainWeight, createdAt',
  exercises: 'name, slug',
  settings: '@id',
});

if (process.env.NODE_ENV !== 'test') {
  db.cloud.configure({
    databaseUrl: import.meta.env.VITE_DEXIE_CLOUD_URL,
    requireAuth: false,
    customLoginGui: true,
  });
}

export { db, type Activity, type Exercise, type Settings };
