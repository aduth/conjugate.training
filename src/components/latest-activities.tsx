import { useLiveQuery } from 'dexie-react-hooks';
import { Trash, ChartNoAxesCombined, Shell, Link, Weight } from 'lucide-react';
import { db } from '#db';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '#components/ui/tooltip';
import { Details, DetailsItem } from './ui/details';
import FormattedWeight from './formatted-weight';
import FormattedDate from './formatted-date';

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
                <FormattedDate value={activity.createdAt} />
              </div>
            </div>
            <Details>
              <DetailsItem icon={ChartNoAxesCombined} name="Reps">
                {activity.reps}
              </DetailsItem>
              {activity.bandType && (
                <DetailsItem icon={Shell} name="Band">
                  {activity.bandType}
                </DetailsItem>
              )}
              {activity.chainWeight > 0 && (
                <DetailsItem icon={Link} name="Chain">
                  <FormattedWeight value={activity.chainWeight} />
                </DetailsItem>
              )}
              {activity.weight > 0 && (
                <DetailsItem icon={Weight} name="Weight">
                  <FormattedWeight value={activity.weight} />
                </DetailsItem>
              )}
            </Details>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LatestActivities;
