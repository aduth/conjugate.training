import { Link } from 'wouter';
import { Button } from './ui/button';

function ExerciseDetailBackLink() {
  const isFromAddActivity = !!history.state?.activityForm;
  const text = isFromAddActivity ? 'Back to new activity' : 'Back to exercises';
  const url = isFromAddActivity ? '/activities/new' : '/exercises';

  return (
    <div className="relative -mb-6">
      <Button asChild variant="outline" className="absolute bottom-full right-0 mb-6">
        <Link to={url} state={history.state}>
          {text}
        </Link>
      </Button>
    </div>
  );
}

export default ExerciseDetailBackLink;
