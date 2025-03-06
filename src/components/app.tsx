import { Link, Redirect, Route, Switch } from 'wouter';
import { Toaster } from '#components/ui/sonner';
import LatestPage from '#pages/latest-activities-page.tsx';
import SignInOut from './sign-in-out';
import AddActivityPage from '#pages/add-activity-page.tsx';

function App() {
  return (
    <div className="relative py-5 h-full">
      <div className="absolute bg-white inset-x-0 top-0 h-40"></div>
      <div className="relative max-w-[600px] mx-auto px-4">
        <header className="mb-5 flex justify-between items-center">
          <Link to="/">
            <img src="/images/logo.svg" width="200" height="61" alt="Home" />
          </Link>
          <SignInOut />
        </header>
        <Switch>
          <Route path="/latest" component={LatestPage} />
          <Route path="/add" component={AddActivityPage} />
          <Route path="/exercises">
            <Redirect to="/latest" />
          </Route>
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
