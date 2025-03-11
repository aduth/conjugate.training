import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app';

describe('App', () => {
  it('redirects to latest activities by default', () => {
    render(<App />);

    expect(location.pathname).toBe('/latest');
  });

  it('allows tab navigation while maintaining focus', async () => {
    const { getByRole } = render(<App />);

    const addNewTab = getByRole('tab', { name: 'Add New' });
    const exercisesTab = getByRole('tab', { name: 'Exercises' });

    // Navigate to "Add New" by clicking
    await userEvent.click(addNewTab);
    expect(location.pathname).toBe('/activities/new');
    expect(document.activeElement).toBe(addNewTab);

    // Navigate to "Exercises" by keyboard
    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(exercisesTab);
    await userEvent.keyboard('{Enter}');
    expect(location.pathname).toBe('/exercises');
    expect(document.activeElement).toBe(exercisesTab);
  });
});
