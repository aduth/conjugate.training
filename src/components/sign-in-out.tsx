import { useObservable } from 'dexie-react-hooks';
import { db } from '#db';
import SignInDialog from './sign-in-dialog';
import AccountMenu from './account-menu';

function SignInOut() {
  const syncState = useObservable(db.cloud.syncState);

  if (!syncState || syncState.phase === 'initial') return null;

  return (
    <>
      <SignInDialog />
      <AccountMenu />
    </>
  );
}

export default SignInOut;
