import { type Mock, describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createActivity } from '#entities/activity';
import { db } from '#db';
import ExportActivitiesButton, { toCSVValue, toCSV } from '../export-activities-button';

vi.mock(import('#db'), async (importOriginal) => {
  const original = await importOriginal();
  original.db.activities.toArray = vi.fn();
  return original;
});

describe('toCSVValue', () => {
  it('returns an empty string for nullish values', () => {
    expect(toCSVValue(null)).toBe('');
    expect(toCSVValue(undefined)).toBe('');
  });

  it('converts non-nullish values to strings', () => {
    expect(toCSVValue(123)).toBe('123');
    expect(toCSVValue(true)).toBe('true');
    expect(toCSVValue('test')).toBe('test');
  });
});

describe('toCSV', () => {
  it('converts rows of strings into a CSV formatted string', () => {
    const rows = [
      ['Name', 'Age', 'City'],
      ['Alice', '30', 'New York'],
      ['Bob', '25', 'Los Angeles'],
    ];

    const expectedCSV = `Name,Age,City\nAlice,30,New York\nBob,25,Los Angeles`;

    expect(toCSV(rows)).toBe(expectedCSV);
  });

  it('quotes fields containing commas and escapes quotes', () => {
    const rows = [
      ['Name', 'Description'],
      ['Alice', 'Likes "coding", reading'],
    ];

    const expectedCSV = `Name,Description\nAlice,"Likes ""coding"", reading"`;

    expect(toCSV(rows)).toBe(expectedCSV);
  });
});

describe('ExportActivitiesButton', () => {
  it('does not render the button if there are no activities', () => {
    const { queryByRole } = render(<ExportActivitiesButton />);

    const button = queryByRole('button', { name: 'Export Data' });

    expect(button).toBeNull();
  });

  it('renders the button if there are activities', async () => {
    await createActivity({ exercise: 'Barbell Bench Press' });

    const { findByRole } = render(<ExportActivitiesButton />);

    const button = await findByRole('button', { name: 'Export Data' });

    expect(button).toBeTruthy();
  });

  it('disables the button while loading', async () => {
    const { promise, resolve } = Promise.withResolvers();
    (db.activities.toArray as Mock).mockImplementation(() => promise);
    await createActivity({ exercise: 'Barbell Bench Press' });

    const { findByRole, getByRole } = render(<ExportActivitiesButton />);

    let button = await findByRole('button', { name: 'Export Data' });

    await userEvent.click(button);

    button = getByRole('button', { name: 'Exporting' });
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('aria-disabled')).toBe('true');

    resolve([]);

    button = await findByRole('button', { name: 'Export Data' });
    expect(button.getAttribute('aria-busy')).toBe('false');
    expect(button.getAttribute('aria-disabled')).toBe('false');
  });
});
