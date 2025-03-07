import { type RouteComponentProps } from 'wouter';
import { useLiveQuery } from 'dexie-react-hooks';
import Page from '#components/page.tsx';
import ActivityForm from '#components/activity-form.tsx';
import { db } from '#db.ts';
import ListSkeleton from '#components/list-skeleton.tsx';

function AddActivityPage({ params }: RouteComponentProps<{ activityId: string }>) {
  const activity = useLiveQuery(() => db.activities.get(params.activityId));

  return (
    <Page tabValue="add">{activity ? <ActivityForm entity={activity} /> : <ListSkeleton />}</Page>
  );
}

export default AddActivityPage;
