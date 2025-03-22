import { pluralize } from '#lib/i18n';

interface FormattedWeightProps {
  value: number;
}

export const getFormattedWeight = (value: number): string =>
  `${value}${pluralize('lb', 'lbs', value)}`;

function FormattedWeight({ value }: FormattedWeightProps) {
  return getFormattedWeight(value);
}

export default FormattedWeight;
