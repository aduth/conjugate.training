import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BehaviorSubject } from 'rxjs';
import { db } from '#db';
import AccountMenu from '../account-menu';

vi.mock('#db', () => ({
  db: {
    cloud: {
      currentUser: new BehaviorSubject(undefined),
      login: vi.fn(),
      logout: vi.fn(),
    },
  },
}));

describe('AccountMenu', () => {
  beforeEach(() => {
    db.cloud.currentUser.next({
      email: 'andrew@andrewduthie.com',
      isLoggedIn: true,
      claims: {},
      lastLogin: new Date(),
    });
  });

  it('renders the account menu button', () => {
    const { getByRole } = render(<AccountMenu />);

    expect(getByRole('button', { name: 'Account menu' })).toBeTruthy();
  });

  it('opens the dropdown menu when the button is clicked', async () => {
    const { getByRole } = render(<AccountMenu />);

    const button = getByRole('button', { name: 'Account menu' });
    await userEvent.click(button);

    expect(getByRole('menuitem', { name: 'Sign Out' })).toBeTruthy();
  });

  it('renders sign in button when user is not logged in', async () => {
    db.cloud.currentUser.next({ isLoggedIn: false, claims: {}, lastLogin: new Date() });

    const { getByRole } = render(<AccountMenu />);

    const button = getByRole('button', { name: 'Account menu' });
    await userEvent.click(button);
    expect(getByRole('menuitem', { name: 'Sign In' })).toBeTruthy();
  });

  it('renders sign in button when data is syncing', async () => {
    db.cloud.currentUser.next({ isLoggedIn: false, claims: {}, lastLogin: new Date() });

    const { getByRole } = render(<AccountMenu />);

    const button = getByRole('button', { name: 'Account menu' });
    await userEvent.click(button);
    expect(getByRole('menuitem', { name: 'Sign In' })).toBeTruthy();
  });

  it('logs out when "Sign Out" is clicked', async () => {
    const { getByRole } = render(<AccountMenu />);

    const button = getByRole('button', { name: 'Account menu' });
    await userEvent.click(button);
    const signOutButton = getByRole('menuitem', { name: 'Sign Out' });
    await userEvent.click(signOutButton);

    expect(db.cloud.logout).toHaveBeenCalled();
  });
});
