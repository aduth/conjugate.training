import { lazy } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'wouter';
import { db } from '#db';
import ListSkeleton from './list-skeleton';
import LatestActivities from './latest-activities';
import { Button } from './ui/button';

interface ExerciseDetailProps {
  slug: string;
}

const ExerciseDetailChart = lazy(() => import('./exercise-detail-chart'));

function ExerciseDetail({ slug }: ExerciseDetailProps) {
  const exercise = useLiveQuery(() => db.exercises.get({ slug }));

  return (
    <>
      <div className="relative -mb-6">
        <Button asChild variant="outline" className="absolute bottom-full right-0 mb-6">
          <Link to="/exercises/">Back to exercises</Link>
        </Button>
      </div>
      {exercise ? (
        <>
          <ExerciseDetailChart exercise={exercise.name} />
          <LatestActivities exercise={exercise.name} />
        </>
      ) : (
        <ListSkeleton />
      )}
    </>
  );
}

export default ExerciseDetail;
