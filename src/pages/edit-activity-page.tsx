import { type RouteComponentProps } from 'wouter';
import { useLiveQuery } from 'dexie-react-hooks';
import ActivityForm from '#components/activity-form';
import { db } from '#db';
import ListSkeleton from '#components/list-skeleton';
import PageTitle from '#components/page-title';

function EditActivityPage({ params }: RouteComponentProps<{ activityId: string }>) {
  const activity = useLiveQuery(() => db.activities.get(params.activityId));

  return (
    <>
      <PageTitle>Edit Activity</PageTitle>
      {activity ? <ActivityForm entity={activity} /> : <ListSkeleton />}
    </>
  );
}

export default EditActivityPage;
