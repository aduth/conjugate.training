import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import FormattedDate, { formatDate } from '../formatted-date';

describe('formatDate', () => {
  it('formats date in default format', () => {
    const date = new Date(2025, 0, 1);

    const result = formatDate({ value: date });

    expect(result).toBe('January 1, 2025');
  });

  it('formats date in custom variant', () => {
    const date = new Date(2025, 0, 1);

    const result = formatDate({ value: date, variant: 'short' });

    expect(result).toBe('1/1/25');
  });
});

describe('FormattedDate', () => {
  it('renders formatted date in default format', () => {
    const date = new Date(2025, 0, 1);

    const { getByText } = render(<FormattedDate value={date} />);

    expect(getByText('January 1, 2025')).toBeTruthy();
  });

  it('renders formatted date in custom variant', () => {
    const date = new Date(2025, 0, 1);

    const { getByText } = render(<FormattedDate value={date} variant="short" />);

    expect(getByText('1/1/25')).toBeTruthy();
  });
});
