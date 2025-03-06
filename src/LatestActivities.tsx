import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';

function LatestActivities() {
  const activities = useLiveQuery(() => db.activities.toArray());

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
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
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {activity.reps}×{activity.weight}lbs
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LatestActivities;
