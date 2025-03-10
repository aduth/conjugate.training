import { type Activity, db } from '#db';

interface CreateActivityOptions
  extends Partial<Pick<Activity, 'reps' | 'bandType' | 'chainWeight' | 'weight' | 'createdAt'>> {
  exercise: Activity['exercise'];
}

export function createActivity({
  exercise,
  reps = 1,
  bandType = null,
  chainWeight = 0,
  weight = 0,
  createdAt = new Date(),
}: CreateActivityOptions) {
  return db.activities.add({ exercise, reps, bandType, chainWeight, weight, createdAt });
}
