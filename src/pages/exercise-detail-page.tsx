import { type RouteComponentProps } from 'wouter';
import ExerciseDetail from '#components/exercise-detail.tsx';
import PageTitle from '#components/page-title.tsx';
import useExerciseName from '#hooks/use-exercise-name.ts';

function ExerciseDetailPage({ params }: RouteComponentProps<{ exercise: string }>) {
  const exerciseName = useExerciseName(params.exercise);

  return (
    <>
      <PageTitle>{exerciseName ?? ''}</PageTitle>
      <ExerciseDetail slug={params.exercise} />
    </>
  );
}

export default ExerciseDetailPage;
