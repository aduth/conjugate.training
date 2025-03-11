import { type RouteComponentProps } from 'wouter';
import ExerciseDetail from '#components/exercise-detail.tsx';

function ExerciseDetailPage({ params }: RouteComponentProps<{ exercise: string }>) {
  return <ExerciseDetail slug={params.exercise} />;
}

export default ExerciseDetailPage;
