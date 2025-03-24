import { useObservable } from 'dexie-react-hooks';
import { Menu } from 'lucide-react';
import { useLocation } from 'wouter';
import { db } from '#db';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import Gravatar from './gravatar';

function AccountMenu() {
  const currentUser = useObservable(db.cloud.currentUser)!;
  const [, navigate] = useLocation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full" aria-label="Account menu">
          <Menu />
          <Gravatar email={currentUser.email} size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => db.cloud.logout()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountMenu;
