export const toCsv = (values?: string[]) =>
  values?.length ? values.join(",") : undefined;