import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import App from '#components/app';

test('creating new activity', async () => {
  indexedDB.deleteDatabase('conjugate');
  const { getByRole } = await render(<App />);

  // Navigate to Add New
  await getByRole('tab', { name: 'Add New' }).click();

  // Populate initial entry
  await getByRole('button', { name: 'Select exercise' }).click();
  await getByRole('combobox', { name: 'Search exercise' }).fill('Barbell Bench Press');
  await getByRole('option', { name: 'Add new “Barbell Bench Press”…', exact: true }).click();
  await getByRole('textbox', { name: 'Weight', exact: true }).fill('225');
  await getByRole('textbox', { name: 'Chain Weight', exact: true }).fill('80');
  await getByRole('button', { name: 'Submit' }).click();

  // Fill basic info
  await getByRole('button', { name: 'Select exercise' }).click();
  await getByRole('combobox', { name: 'Search exercise' }).fill('Barbell Bench Press');
  await getByRole('option', { name: 'Barbell Bench Press', exact: true }).click();
  await getByRole('textbox', { name: 'Weight', exact: true }).fill('225');

  // Exercise detail should show latest recorded data when creating activity for same exercise, but
  // only for exact match of all parameters
  await expect.element(page.getByText('Best', { exact: true })).not.toBeInTheDocument();
  await getByRole('textbox', { name: 'Chain Weight', exact: true }).fill('80');
  await expect.element(page.getByText('Best', { exact: true })).toBeInTheDocument();

  // Navigating from and back should maintain information
  await getByRole('link', { name: 'History (1)' }).click();
  const tabPanel = await getByRole('tabpanel', { name: 'Barbell Bench Press' });
  await expect.element(tabPanel).toHaveFocus();
  await getByRole('link', { name: 'Back to new activity' }).click();

  const weightInput = getByRole('textbox', {
    name: 'Weight',
    exact: true,
  }).element() as HTMLInputElement;
  expect(weightInput.value).to.equal('225');

  // Submitting should reset form fields to empty, even if initial state stored in history
  await getByRole('button', { name: 'Submit' }).click();
  await getByRole('alert', { name: 'Activity saved successfully' });
  expect(weightInput.value).to.equal('0');
});
