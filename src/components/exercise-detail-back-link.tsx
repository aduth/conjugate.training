import { Link, useSearchParams } from 'wouter';
import { Button } from './ui/button';

interface ExerciseDetailBackLinkProps {
  slug: string;
}

function addQueryParam(url: string, key: string, value: string) {
  const newURL = new URL(url, window.location.href);
  newURL.searchParams.set(key, value);
  return newURL.pathname + newURL.search;
}

function ExerciseDetailBackLink({ slug }: ExerciseDetailBackLinkProps) {
  const [searchParams] = useSearchParams();
  const isFromAddActivity = searchParams.get('referrer') === 'add-activity';
  const text = isFromAddActivity ? 'Back to new activity' : 'Back to exercises';
  const url = isFromAddActivity ? addQueryParam('/activities/new', 'exercise', slug) : '/exercises';

  return (
    <div className="relative -mb-6">
      <Button asChild variant="outline" className="absolute bottom-full right-0 mb-6">
        <Link to={url}>{text}</Link>
      </Button>
    </div>
  );
}

export default ExerciseDetailBackLink;
