import useSettings from '#hooks/use-settings.ts';
import { pluralize } from '#lib/i18n';

interface FormattedWeightProps {
  value: number;
}

const getUnitSingular = (unit: 'lbs' | 'kgs') => unit.slice(0, -1);

function round(value: number, precision: number = 1): number {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

export const getFormattedWeight = (value: number, unit: 'lbs' | 'kgs' = 'lbs'): string =>
  `${value}${pluralize(getUnitSingular(unit), unit, value)}`;

function FormattedWeight({ value }: FormattedWeightProps) {
  const [settings] = useSettings();
  return getFormattedWeight(round(value), settings?.unit);
}

export default FormattedWeight;
