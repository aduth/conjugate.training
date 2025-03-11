import EmptyState from './empty-state';

const COMPONENT = (
  <EmptyState
    title="No activities yet"
    description="Add your first activity to start tracking exercise progress"
    actionText="Add activity"
    actionURL="/activities/new"
  />
);

const EmptyActivitiesState = () => COMPONENT;

export default EmptyActivitiesState;
