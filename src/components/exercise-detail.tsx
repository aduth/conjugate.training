import { lazy } from 'react';
import useExerciseName from '#hooks/use-exercise-name.ts';
import ListSkeleton from './list-skeleton';
import LatestActivities from './latest-activities';
import ExerciseDetailBackLink from './exercise-detail-back-link';
import EmptyExerciseState from './empty-exercise-state';

interface ExerciseDetailProps {
  slug: string;
}

const ExerciseDetailChart = lazy(() => import('./exercise-detail-chart'));

function ExerciseDetail({ slug }: ExerciseDetailProps) {
  const name = useExerciseName(slug);

  if (name) {
    return (
      <>
        <ExerciseDetailBackLink />
        <ExerciseDetailChart exercise={name} />
        <LatestActivities exercise={name} />
      </>
    );
  } else if (name === null) {
    return (
      <>
        <ExerciseDetailBackLink />
        <EmptyExerciseState />
      </>
    );
  }

  return (
    <>
      <ExerciseDetailBackLink />
      <ListSkeleton />
    </>
  );
}

export default ExerciseDetail;
