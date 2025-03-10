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

  it('saves "None" band type as null', async () => {
    vi.spyOn(db.activities, 'add');
    (useLocation as Mock).mockReturnValue([undefined, vi.fn()]);
    const { getByRole } = render(<ActivityForm />);

    // Select exercise
    const exerciseField = getByRole('combobox', { name: 'Select exercise' });
    await userEvent.click(exerciseField);
    const input = document.activeElement!;
    await userEvent.type(input, 'Barbell Bench Press');
    let controlsId = input.getAttribute('aria-controls')!;
    let options = document.getElementById(controlsId)!;
    let option = within(options).getByRole('option', { name: 'Add new “Barbell Bench Press”…' });
    await userEvent.click(option);

    // Select non-"None" band type
    let bandTypeField = getByRole('combobox', { name: 'Band Type' });
    await userEvent.click(bandTypeField);
    controlsId = bandTypeField.getAttribute('aria-controls')!;
    options = document.getElementById(controlsId)!;
    option = within(options).getByRole('option', { name: 'Light Band' });
    await userEvent.click(option);

    // Revert back to "None" band type
    bandTypeField = getByRole('combobox', { name: 'Band Type' });
    await userEvent.click(bandTypeField);
    controlsId = bandTypeField.getAttribute('aria-controls')!;
    options = document.getElementById(controlsId)!;
    option = within(options).getByRole('option', { name: 'None' });
    await userEvent.click(option);

    // Save
    const submitButton = getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    expect(db.activities.add).toHaveBeenCalledWith(
      expect.objectContaining({
        bandType: null,
      }),
    );
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

    const repsField = getByRole('spinbutton', { name: 'Reps' }) as HTMLInputElement;
    expect(repsField.value).to.equal('2');

    const weightField = getByRole('textbox', { name: 'Weight' }) as HTMLInputElement;
    expect(weightField.value).to.equal('200');

    const dateField = getByRole('button', { name: 'Date' });
    expect(dateField.textContent).to.equal('January 1st, 2025');

    // Edit field with verification below
    await userEvent.clear(weightField);
    await userEvent.type(weightField, '225');

    // Regression: Ensure that editing to create a new exercise saves new exercise
    await userEvent.click(exerciseField);
    const input = document.activeElement!;
    await userEvent.type(input, 'My Custom Exercise');
    const controlsId = input.getAttribute('aria-controls')!;
    const options = document.getElementById(controlsId)!;
    const option = within(options).getByRole('option', { name: 'Add new “My Custom Exercise”…' });
    await userEvent.click(option);

    const submitButton = getByRole('button', { name: 'Update' });
    await userEvent.click(submitButton);

    expect(db.activities.update).toHaveBeenCalledWith(expect.any(String), {
      bandType: 'Light',
      chainWeight: 80,
      createdAt: new Date(2025, 0, 1),
      exercise: 'My Custom Exercise',
      reps: 2,
      weight: 225,
    });
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Activity saved successfully'));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/latest'));
    expect(await db.exercises.get('My Custom Exercise')).toBeTruthy();
  });
});
