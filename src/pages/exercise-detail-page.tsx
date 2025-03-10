import { type RouteComponentProps } from 'wouter';
import Page from '#components/page.tsx';
import ExerciseDetail from '#components/exercise-detail.tsx';

function ExerciseDetailPage({ params }: RouteComponentProps<{ exercise: string }>) {
  return (
    <Page tabValue="exercises">
      <ExerciseDetail slug={params.exercise} />
    </Page>
  );
}

export default ExerciseDetailPage;
