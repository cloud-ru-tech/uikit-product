import { FormValues } from '../types';

export function filterNonEmptyArrays(input: FormValues): FormValues {
  const result: FormValues = {};

  for (const key in input) {
    if (input[key]?.length > 0) {
      result[key] = input?.[key];
    }
  }

  return result;
}
