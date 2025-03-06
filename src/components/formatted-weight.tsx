import { pluralize } from '#lib/i18n.ts';

interface FormattedWeightProps {
  value: number;
}

function FormattedWeight({ value }: FormattedWeightProps) {
  return `${value}${pluralize('lb', 'lbs', value)}`;
}

export default FormattedWeight;
