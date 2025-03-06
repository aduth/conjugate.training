export const pluralize = (singular: string, plural: string, count: number): string =>
  count === 1 ? singular : plural;
