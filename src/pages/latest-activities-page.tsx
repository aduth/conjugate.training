import ExportActivitiesButton from '#components/export-activities-button';
import LatestActivities from '#components/latest-activities';
import PageTitle from '#components/page-title';

function LatestActivitiesPage() {
  return (
    <>
      <PageTitle>Latest Activities</PageTitle>
      <ExportActivitiesButton className="absolute top-0 end-0 mr-6 mt-6" />
      <LatestActivities />
    </>
  );
}

export default LatestActivitiesPage;
