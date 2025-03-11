import { type RouteComponentProps } from 'wouter';
import ExerciseDetail from '#components/exercise-detail.tsx';
import PageTitle from '#components/page-title.tsx';

function ExerciseDetailPage({ params }: RouteComponentProps<{ exercise: string }>) {
  return (
    <>
      <PageTitle>Exercise Detail</PageTitle>
      <ExerciseDetail slug={params.exercise} />
    </>
  );
}

export default ExerciseDetailPage;
