import { type RouteComponentProps } from 'wouter';
import Page from '#components/page.tsx';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '#db.ts';
import LatestActivities from '#components/latest-activities.tsx';

function ExerciseDetailPage({ params }: RouteComponentProps<{ exercise: string }>) {
  const exercise = useLiveQuery(() => db.exercises.get({ slug: params.exercise }));

  return (
    <Page tabValue="exercises">{exercise && <LatestActivities exercise={exercise.name} />}</Page>
  );
}

export default ExerciseDetailPage;
