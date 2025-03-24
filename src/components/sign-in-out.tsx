import { useObservable } from 'dexie-react-hooks';
import { LogIn } from 'lucide-react';
import { db } from '#db';
import { Button } from './ui/button';
import SignInDialog from './sign-in-dialog';
import AccountMenu from './account-menu';

function SignInOut() {
  const currentUser = useObservable(db.cloud.currentUser);
  const syncState = useObservable(db.cloud.syncState);

  if (!syncState || syncState.phase === 'initial') return null;
  if (currentUser?.isLoggedIn) return <AccountMenu />;

  return (
    <>
      <SignInDialog />
      <Button variant="outline" onClick={() => db.cloud.login()}>
        <LogIn aria-hidden /> Sign in
      </Button>
    </>
  );
}

export default SignInOut;
