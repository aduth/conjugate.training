import ActivityForm from '#components/activity-form';
import PageTitle from '#components/page-title.tsx';

function NewActivityPage() {
  return (
    <>
      <PageTitle>Add Activity</PageTitle>
      <ActivityForm />
    </>
  );
}

export default NewActivityPage;
