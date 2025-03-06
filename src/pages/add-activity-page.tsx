import Page from '#components/page.tsx';
import ActivityForm from '#components/activity-form.tsx';

function AddActivityPage() {
  return (
    <Page tabValue="add">
      <ActivityForm />
    </Page>
  );
}

export default AddActivityPage;
