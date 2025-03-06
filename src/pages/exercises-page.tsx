import ExerciseList from '#components/exercise-list.tsx';
import Page from '#components/page.tsx';

function ExercisesPage() {
  return (
    <Page tabValue="exercises">
      <ExerciseList />
    </Page>
  );
}

export default ExercisesPage;
