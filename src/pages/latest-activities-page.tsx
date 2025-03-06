import LatestActivities from '#components/latest-activities.tsx';
import Page from '#components/page.tsx';

function LatestActivitiesPage() {
  return (
    <Page tabValue="latest">
      <LatestActivities />
    </Page>
  );
}

export default LatestActivitiesPage;
