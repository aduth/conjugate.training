import { type RouteComponentProps } from 'wouter';
import ExerciseDetail from '#components/exercise-detail';
import PageTitle from '#components/page-title';
import useExerciseName from '#hooks/use-exercise-name';

function ExerciseDetailPage({ params }: RouteComponentProps<{ exercise: string }>) {
  const exerciseName = useExerciseName(params.exercise);

  return (
    <>
      <PageTitle showHeading={false}>{exerciseName ?? null}</PageTitle>
      <ExerciseDetail slug={params.exercise} />
    </>
  );
}

export default ExerciseDetailPage;
