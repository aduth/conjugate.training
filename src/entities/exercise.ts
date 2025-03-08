import { db } from '#db';
import { toKebabCase } from 'remeda';

export async function addCustomExercise(name: string): Promise<string> {
  const slug = toKebabCase(name);

  try {
    await db.exercises.add({ slug, name, isCustom: true }, name);
  } catch (error: any) {
    if (error.name !== 'ConstraintError') throw error;
  }

  return slug;
}
