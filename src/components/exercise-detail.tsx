import { lazy } from 'react';
import useExerciseName from '#hooks/use-exercise-name.ts';
import ListSkeleton from './list-skeleton';
import LatestActivities from './latest-activities';
import ExerciseDetailBackLink from './exercise-detail-back-link';

interface ExerciseDetailProps {
  slug: string;
}

const ExerciseDetailChart = lazy(() => import('./exercise-detail-chart'));

function ExerciseDetail({ slug }: ExerciseDetailProps) {
  const name = useExerciseName(slug);

  return (
    <>
      <ExerciseDetailBackLink />
      {name ? (
        <>
          <ExerciseDetailChart exercise={name} />
          <LatestActivities exercise={name} />
        </>
      ) : (
        <ListSkeleton />
      )}
    </>
  );
}

export default ExerciseDetail;
