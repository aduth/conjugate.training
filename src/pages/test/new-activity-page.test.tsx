import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import NewActivityPage from '../new-activity-page';

describe('NewActivityPage', () => {
  it('sets the page title', () => {
    render(<NewActivityPage />);

    expect(document.title).toBe('Conjugate Training - Add Activity');
  });
});
