import { type RouteComponentProps } from 'wouter';
import { useLiveQuery } from 'dexie-react-hooks';
import ActivityForm from '#components/activity-form.tsx';
import { db } from '#db.ts';
import ListSkeleton from '#components/list-skeleton.tsx';
import PageTitle from '#components/page-title.tsx';

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
