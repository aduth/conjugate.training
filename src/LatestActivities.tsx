import { useLiveQuery } from 'dexie-react-hooks';
import { Trash, ChartNoAxesCombined, Shell, Link, Weight } from 'lucide-react';
import { db } from './db';
import { pluralize } from './lib/i18n';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function LatestActivities() {
  const activities = useLiveQuery(() => db.activities.orderBy('createdAt').reverse().toArray());

  return (
    <ul className="divide-y -my-4 divide-gray-200">
      {activities?.map((activity) => (
        <li key={activity.id} className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="font-medium text-gray-900 truncate flex items-center">
                {activity.exercise}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      type="button"
                      onClick={() => db.activities.delete(activity.id)}
                      className="p-2 -mr-2 text-gray-500 hover:text-red-400 cursor-pointer"
                    >
                      <Trash size="16" />
                    </TooltipTrigger>
                    <TooltipContent sideOffset={-10}>Delete</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm text-gray-500 truncate">
                {new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(
                  activity.createdAt,
                )}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="divide-x divide-gray-300 flex text-right">
                <div className="pr-4">
                  <div className="flex items-center text-sm text-base text-gray-700">
                    <ChartNoAxesCombined size="16" className="inline-flex me-1" />
                    Reps
                  </div>
                  <div className="font-semibold">{activity.reps}</div>
                </div>
                {activity.bandType && (
                  <div className="px-4 last:pr-0">
                    <div className="flex items-center text-sm text-base text-gray-700">
                      <Shell size="16" className="inline-flex me-1" />
                      Band
                    </div>
                    <div className="font-semibold">{activity.bandType}</div>
                  </div>
                )}
                {activity.chainWeight > 0 && (
                  <div className="px-4 last:pr-0">
                    <div className="flex items-center text-sm text-base text-gray-700">
                      <Link size="16" className="inline-flex me-1" />
                      Chain
                    </div>
                    <div className="font-semibold">
                      {activity.weight}
                      {pluralize('lb', 'lbs', activity.weight)}
                    </div>
                  </div>
                )}
                {activity.weight > 0 && (
                  <div className="px-4 last:pr-0">
                    <div className="flex items-center text-sm text-base text-gray-700">
                      <Weight size="16" className="inline-flex me-1" />
                      Weight
                    </div>
                    <div className="font-semibold">
                      {activity.weight}
                      {pluralize('lb', 'lbs', activity.weight)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LatestActivities;
