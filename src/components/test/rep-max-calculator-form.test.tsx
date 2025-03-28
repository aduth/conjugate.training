import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RepMaxCalculatorForm from '../rep-max-calculator-form';

describe('RepMaxCalculatorForm', () => {
  it('renders the form with default values', () => {
    const { getByLabelText, getByRole } = render(<RepMaxCalculatorForm />);

    expect(getByLabelText('Source Weight')).toHaveValue('0');
    expect(getByLabelText('Source Reps')).toHaveValue(1);
    expect(getByLabelText('Target Percentage')).toHaveValue(100);
    expect(getByLabelText('Target Reps')).toHaveValue(1);
    expect(getByRole('status')).toBeEmptyDOMElement();
  });

  it('does not display a result when source weight is zero', async () => {
    const { getByLabelText, getByRole } = render(<RepMaxCalculatorForm />);

    const sourceWeightInput = getByLabelText('Source Weight');
    await userEvent.type(sourceWeightInput, '0');

    expect(getByRole('status')).toBeEmptyDOMElement();
  });

  it('displays the calculated result when inputs are valid', async () => {
    const { getByLabelText, getByRole } = render(<RepMaxCalculatorForm />);

    const sourceWeightInput = getByLabelText('Source Weight');
    await userEvent.type(sourceWeightInput, '100');

    const sourceRepsInput = getByLabelText('Source Reps');
    await userEvent.type(sourceRepsInput, '5');

    const targetPercentageInput = getByLabelText('Target Percentage');
    await userEvent.type(targetPercentageInput, '80');

    const targetRepsInput = getByLabelText('Target Reps');
    await userEvent.type(targetRepsInput, '3');

    expect(getByRole('status')).toHaveTextContent('Result: 83.7lbs');
  });

  it('should ignore invalid (non-numeric) input in numeric text fields', async () => {
    const { getByLabelText } = render(<RepMaxCalculatorForm />);

    const sourceWeightInput = getByLabelText('Source Weight');
    await userEvent.type(sourceWeightInput, '12invalid');
    expect(sourceWeightInput).toHaveValue('12');
  });
});
