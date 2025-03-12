import { lazy } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '#db';
import ListSkeleton from './list-skeleton';
import LatestActivities from './latest-activities';

interface ExerciseDetailProps {
  slug: string;
}

const ExerciseDetailChart = lazy(() => import('./exercise-detail-chart'));

function ExerciseDetail({ slug }: ExerciseDetailProps) {
  const exercise = useLiveQuery(() => db.exercises.get({ slug }));

  if (!exercise) return <ListSkeleton />;

  return (
    <>
      <ExerciseDetailChart exercise={exercise.name} />
      <LatestActivities exercise={exercise.name} />
    </>
  );
}

export default ExerciseDetail;
