import { useObservable } from 'dexie-react-hooks';
import { LogOut, LogIn } from 'lucide-react';
import { db } from '#db';
import { Button } from './ui/button';
import Gravatar from './gravatar';

function SignInOut() {
  const currentUser = useObservable(db.cloud.currentUser);

  if (currentUser?.email) {
    return (
      <div className="flex space-x-2 items-center">
        <Gravatar email={currentUser.email} />
        <Button variant="outline" onClick={() => db.cloud.logout()}>
          <LogOut /> Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" onClick={() => db.cloud.login()}>
      <LogIn /> Sign in
    </Button>
  );
}

export default SignInOut;
