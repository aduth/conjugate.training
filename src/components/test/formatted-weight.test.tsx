import { type Mock, describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import useSettings from '#hooks/use-settings';
import FormattedWeight, { getFormattedWeight } from '../formatted-weight';

vi.mock('#hooks/use-settings', () => ({
  default: vi.fn(),
}));

describe('getFormattedWeight', () => {
  it('should format weight in pounds correctly', () => {
    expect(getFormattedWeight(1, 'lbs')).toBe('1lb');
    expect(getFormattedWeight(5, 'lbs')).toBe('5lbs');
  });

  it('should format weight in kilograms correctly', () => {
    expect(getFormattedWeight(1, 'kgs')).toBe('1kg');
    expect(getFormattedWeight(5, 'kgs')).toBe('5kgs');
  });

  it('should default to pounds if no unit is provided', () => {
    expect(getFormattedWeight(10)).toBe('10lbs');
  });

  it('should handle zero weight correctly', () => {
    expect(getFormattedWeight(0, 'lbs')).toBe('0lbs');
    expect(getFormattedWeight(0, 'kgs')).toBe('0kgs');
  });
});

describe('FormattedWeight component', () => {
  it('should render formatted weight with default unit (lbs)', () => {
    (useSettings as Mock).mockReturnValue([{}]);

    const { getByText } = render(<FormattedWeight value={10} />);

    expect(getByText('10lbs')).toBeTruthy();
  });

  it('should render formatted weight with unit from settings (kgs)', () => {
    (useSettings as Mock).mockReturnValue([{ unit: 'kgs' }]);

    const { getByText } = render(<FormattedWeight value={5} />);

    expect(getByText('5kgs')).toBeTruthy();
  });

  it('should render formatted weight with zero value', () => {
    (useSettings as Mock).mockReturnValue([{ unit: 'lbs' }]);

    const { getByText } = render(<FormattedWeight value={0} />);

    expect(getByText('0lbs')).toBeTruthy();
  });
});
