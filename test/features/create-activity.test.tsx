import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '#components/app.tsx';

test('properly handles form inputs', async () => {
  indexedDB.deleteDatabase('conjugate');
  const { getByRole } = render(<App />);

  // Navigate to Add New
  await getByRole('tab', { name: 'Add New' }).click();

  // Populate initial entry
  await getByRole('button', { name: 'Select exercise' }).click();
  await getByRole('combobox', { name: 'Search exercise' }).fill('Barbell Bench Press');
  // await userEvent.fill(document.activeElement!, 'Barbell Bench Press');
  await getByRole('option', { name: 'Add new “Barbell Bench Press”…' }).click();
  await getByRole('textbox', { name: 'Weight', exact: true }).fill('225');
  await getByRole('button', { name: 'Submit' }).click();

  // Fill basic info
  await getByRole('button', { name: 'Select exercise' }).click();
  await getByRole('combobox', { name: 'Search exercise' }).fill('Barbell Bench Press');
  await getByRole('option', { name: 'Barbell Bench Press' }).click();
  await getByRole('textbox', { name: 'Weight', exact: true }).fill('225');

  // Navigating from and back should maintain information
  await getByRole('link', { name: 'History (1)' }).click();
  await getByRole('link', { name: 'Back to new activity' }).click();

  const weightInput = getByRole('textbox', {
    name: 'Weight',
    exact: true,
  }).element() as HTMLInputElement;
  expect(weightInput.value).to.equal('225');
});
