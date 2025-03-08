import { type RouteComponentProps } from 'wouter';
import Page from '#components/page.tsx';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '#db.ts';

function ExerciseDetailPage({ params }: RouteComponentProps<{ exercise: string }>) {
  const exercise = useLiveQuery(() => db.exercises.get(params.exercise));

  return <Page tabValue="exercises">{exercise?.name}</Page>;
}

export default ExerciseDetailPage;
