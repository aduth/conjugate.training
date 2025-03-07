import { Link, Redirect, Route, Switch } from 'wouter';
import { Toaster } from '#components/ui/sonner';
import LatestPage from '#pages/latest-activities-page';
import SignInOut from './sign-in-out';
import AddActivityPage from '#pages/add-activity-page';
import EditActivityPage from '#pages/edit-activity-page';
import ExercisesPage from '#pages/exercises-page';

function App() {
  return (
    <div className="relative py-5 h-full">
      <div className="absolute bg-white inset-x-0 top-0 h-40"></div>
      <div className="relative max-w-[600px] mx-auto">
        <header className="mb-5 flex justify-between items-center mx-4 md:mx-0">
          <Link to="/">
            <img src="/images/logo.svg" className="w-40 h-[49px] md:w-50 md:h-[51px]" alt="Home" />
          </Link>
          <SignInOut />
        </header>
        <Switch>
          <Route path="/latest" component={LatestPage} />
          <Route path="/add" component={AddActivityPage} />
          <Route path="/edit/:activityId" component={EditActivityPage} />
          <Route path="/exercises" component={ExercisesPage} />
          <Route>
            <Redirect to="/latest" />
          </Route>
        </Switch>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
