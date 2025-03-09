import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type Mock, describe, it, expect, vi, afterEach } from 'vitest';
import { useLocation } from 'wouter';
import { computeAccessibleName } from 'dom-accessibility-api';
import { db } from '#db';
import { toast } from 'sonner';
import ActivityForm from '../activity-form';

vi.mock('wouter', () => ({
  useLocation: vi.fn().mockImplementation(() => []),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('ActivityForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should allow creation of new activity', async () => {
    vi.spyOn(db.activities, 'add');
    const { getByRole } = render(<ActivityForm />);

    const exerciseField = getByRole('combobox', { name: 'Select exercise' });

    await userEvent.click(exerciseField);
    const input = document.activeElement!;
    expect(computeAccessibleName(input)).to.equal('Search exercise');

    await userEvent.type(input, 'Barbell Bench Press');
    const controlsId = input.getAttribute('aria-controls')!;
    const options = document.getElementById(controlsId)!;
    const option = within(options).getByRole('option', { name: 'Add new “Barbell Bench Press”…' });
    await userEvent.click(option);

    const weightField = getByRole('textbox', { name: 'Weight' }) as HTMLInputElement;
    await userEvent.type(weightField, '225');

    const submitButton = getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    expect(db.activities.add).toHaveBeenCalledWith(
      expect.objectContaining({
        bandType: null,
        chainWeight: 0,
        createdAt: expect.any(Date),
        exercise: 'Barbell Bench Press',
        reps: 1,
        weight: 225,
      }),
    );
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Activity saved successfully'));
  });

  it('should allow editing of existing activity', async () => {
    const key = await db.activities.add({
      exercise: 'Barbell Bench Press',
      bandType: 'Light',
      weight: 200,
      chainWeight: 80,
      reps: 2,
      createdAt: new Date(2025, 0, 1),
    });
    const entity = await db.activities.get(key);
    const navigate = vi.fn();
    vi.spyOn(db.activities, 'update');
    (useLocation as Mock).mockReturnValue([undefined, navigate]);
    const { getByRole } = render(<ActivityForm entity={entity} />);

    const exerciseField = getByRole('combobox', { name: 'Select exercise' });
    expect(exerciseField.textContent).to.equal('Barbell Bench Press');

    const bandTypeField = getByRole('combobox', { name: 'Band Type' });
    expect(bandTypeField.textContent).to.equal('Light Band');

    const chainWeightField = getByRole('textbox', { name: 'Chain Weight' }) as HTMLInputElement;
    expect(chainWeightField.value).to.equal('80');

    const repsField = getByRole('textbox', { name: 'Reps' }) as HTMLInputElement;
    expect(repsField.value).to.equal('2');

    const weightField = getByRole('textbox', { name: 'Weight' }) as HTMLInputElement;
    expect(weightField.value).to.equal('200');

    const dateField = getByRole('button', { name: 'Date' });
    expect(dateField.textContent).to.equal('January 1st, 2025');

    await userEvent.clear(weightField);
    await userEvent.type(weightField, '225');

    const submitButton = getByRole('button', { name: 'Update' });
    await userEvent.click(submitButton);

    expect(db.activities.update).toHaveBeenCalledWith(expect.any(String), {
      bandType: 'Light',
      chainWeight: 80,
      createdAt: new Date(2025, 0, 1),
      exercise: 'Barbell Bench Press',
      reps: 2,
      weight: 225,
    });
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Activity saved successfully'));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/latest'));
  });
});
