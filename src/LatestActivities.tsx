import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';

function LatestActivities() {
  const activities = useLiveQuery(() => db.activities.toArray());

  return (
    <ul>
      {activities?.map((activity) => (
        <li key={activity.id}>
          {activity.exercise} {activity.weight}
        </li>
      ))}
    </ul>
  );
}

export default LatestActivities;
