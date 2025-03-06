interface FormattedDateProps {
  value: Date;

  variant?: 'long' | 'short';
}

function FormattedDate({ value, variant = 'long' }: FormattedDateProps) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: variant }).format(value);
}

export default FormattedDate;
