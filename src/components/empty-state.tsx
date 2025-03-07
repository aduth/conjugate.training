import { ListX, Plus } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from './ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText: string;
  actionURL: string;
}

function EmptyState({ title, description, actionText, actionURL }: EmptyStateProps) {
  return (
    <div className="max-w-60 mx-auto my-4 flex flex-col space-y-4 items-center text-center">
      <span className="bg-stone-100 p-2 rounded-md">
        <ListX />
      </span>
      <div className="space-y-1">
        <div className="font-semibold">{title}</div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Button asChild>
        <Link to={actionURL} className="flex items-center">
          <Plus size="14" />
          {actionText}
        </Link>
      </Button>
    </div>
  );
}

export default EmptyState;
