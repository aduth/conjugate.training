import { lazy } from 'react';
import useExercise from '#hooks/use-exercise';
import ListSkeleton from './list-skeleton';
import LatestActivities from './latest-activities';
import ExerciseDetailBackLink from './exercise-detail-back-link';
import EmptyExerciseState from './empty-exercise-state';
import PageHeading from './page-heading';
import ExerciseRename from './exercise-rename';

interface ExerciseDetailProps {
  slug: string;
}

const ExerciseDetailChart = lazy(() => import('./exercise-detail-chart'));

function ExerciseDetail({ slug }: ExerciseDetailProps) {
  const exercise = useExercise(slug);

  if (exercise) {
    return (
      <>
        <PageHeading>
          {exercise.realmId === 'rlm-public' ? (
            exercise.name
          ) : (
            <ExerciseRename name={exercise.name} />
          )}
        </PageHeading>
        <ExerciseDetailBackLink />
        <ExerciseDetailChart exercise={exercise.name} />
        <LatestActivities exercise={exercise.name} />
      </>
    );
  } else if (exercise === null) {
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
