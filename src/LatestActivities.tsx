import { useLiveQuery } from 'dexie-react-hooks';
import { CircleX } from 'lucide-react';
import { db } from './db';
import { pluralize } from './lib/i18n';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function LatestActivities() {
  const activities = useLiveQuery(() => db.activities.toArray());

  return (
    <ul className="divide-y -my-4 divide-gray-200 dark:divide-gray-700">
      {activities?.map((activity) => (
        <li key={activity.id} className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 truncate">{activity.exercise}</div>
              <div className="text-sm text-gray-500 truncate">
                {new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(
                  activity.createdAt,
                )}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {activity.reps}×{activity.weight}
                {pluralize('lb', 'lbs', activity.weight)}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      type="button"
                      onClick={() => db.activities.delete(activity.id)}
                      className="p-2 -mx-2 text-gray-500 hover:text-red-400 cursor-pointer"
                    >
                      <CircleX size="20" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={-10}>Delete</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LatestActivities;
