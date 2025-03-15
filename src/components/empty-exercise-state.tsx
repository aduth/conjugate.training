import EmptyState from './empty-state';

const COMPONENT = (
  <EmptyState
    title="Exercise not found"
    description="Check the URL or create an activity for this exercise"
    actionText="Add activity"
    actionURL="/activities/new"
  />
);

const EmptyExerciseState = () => COMPONENT;

export default EmptyExerciseState;
