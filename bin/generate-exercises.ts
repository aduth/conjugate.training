#!/usr/bin/env node

// Generates exercise data to be imported into Dexie Cloud as public realm data, accessible to all
// users as the default set of exercises.
//
// Usage:
//   bin/generate-exercises.ts > publicData.json
//   npx dexie-cloud import publicData.json
//
// References:
// - https://dexie.org/cloud/docs/access-control#the-public-realm
// - https://dexie.org/cloud/docs/add-public-data

import { indexBy, map, pipe, prop } from 'remeda';
import { fetchExercises } from '#services/exercises';
import { getExerciseSlug } from '#entities/exercise';

interface DexieCloudImport {
  data: {
    [realmId: string]: {
      [table: string]: object;
    };
  };
}

async function generateImportData(): Promise<DexieCloudImport> {
  const exercises = pipe(
    await fetchExercises(),
    map((exercise) => ({
      slug: getExerciseSlug(exercise.name),
      name: exercise.name,
    })),
    indexBy(prop('name')),
  );

  return { data: { 'rlm-public': { exercises } } };
}

process.stdout.write(JSON.stringify(await generateImportData(), null, 2));
