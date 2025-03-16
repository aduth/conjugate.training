import { Link } from 'wouter';
import { ChevronLeft } from 'lucide-react';

function ExerciseDetailBackLink() {
  const isFromAddActivity = !!history.state?.activityForm;
  const text = isFromAddActivity ? 'Back to new activity' : 'Back to exercises';
  const url = isFromAddActivity ? '/activities/new' : '/exercises';

  return (
    <div className="-mt-5 font-light text-sm text-gray-700">
      <Link to={url} state={history.state} className="flex items-center gap-x-0.5">
        <ChevronLeft size={14} className="-ml-1" />
        {text}
      </Link>
    </div>
  );
}

export default ExerciseDetailBackLink;
