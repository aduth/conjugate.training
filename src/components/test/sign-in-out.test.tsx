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

  it('renders user menu', () => {
    db.cloud.syncState.next({ phase: 'in-sync', status: 'connected' });

    const { getByRole } = render(<SignInOut />);

    expect(getByRole('button', { name: 'Account menu' })).toBeTruthy();
  });
});
