import { db } from '@/db';

export async function addCustomExercise(name: string) {
  try {
    await db.exercises.add({ name, isCustom: true }, name);
  } catch (error: any) {
    if (error.name === 'ConstraintError') return;
    throw error;
  }
}
