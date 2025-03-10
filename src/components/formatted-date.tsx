interface FormattedDateProps {
  value: Date;

  variant?: 'long' | 'short';
}

type FormatDateOptions = FormattedDateProps;

export const formatDate = ({ value, variant = 'long' }: FormatDateOptions): string =>
  new Intl.DateTimeFormat(undefined, { dateStyle: variant }).format(value);

function FormattedDate({ value, variant = 'long' }: FormattedDateProps) {
  return formatDate({ value, variant });
}

export default FormattedDate;
