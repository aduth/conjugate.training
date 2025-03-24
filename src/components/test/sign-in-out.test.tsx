import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BehaviorSubject } from 'rxjs';
import { db } from '#db';
import SignInOut from '../sign-in-out';

vi.mock('#db', () => ({
  db: {
    cloud: {
      syncState: new BehaviorSubject(undefined),
      currentUser: new BehaviorSubject(undefined),
      userInteraction: new BehaviorSubject(undefined),
    },
  },
}));

describe('SignInOut Component', () => {
  it('renders nothing when syncState is undefined', () => {
    const { container } = render(<SignInOut />);

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when syncState is "initial"', () => {
    db.cloud.syncState.next({ phase: 'initial', status: 'connecting' });

    const { container } = render(<SignInOut />);

    expect(container.firstChild).toBeNull();
  });

  it('renders sign in button when user is not logged in', () => {
    db.cloud.syncState.next({ phase: 'in-sync', status: 'connected' });
    db.cloud.currentUser.next({ isLoggedIn: false, claims: {}, lastLogin: new Date() });

    const { getByRole } = render(<SignInOut />);

    expect(getByRole('button', { name: 'Sign in' })).toBeTruthy();
  });

  it('renders sign in button when data is syncing', () => {
    db.cloud.syncState.next({ phase: 'not-in-sync', status: 'connected' });
    db.cloud.currentUser.next({ isLoggedIn: false, claims: {}, lastLogin: new Date() });

    const { getByRole } = render(<SignInOut />);

    expect(getByRole('button', { name: 'Sign in' })).toBeTruthy();
  });

  it('renders user menu when signed in', () => {
    db.cloud.syncState.next({ phase: 'in-sync', status: 'connected' });
    db.cloud.currentUser.next({ isLoggedIn: true, claims: {}, lastLogin: new Date() });

    const { getByRole } = render(<SignInOut />);

    expect(getByRole('button', { name: 'Account menu' })).toBeTruthy();
  });
});
