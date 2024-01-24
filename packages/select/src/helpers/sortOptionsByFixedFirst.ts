import { MultiSelectOptionType } from './types';

export const sortOptionsByFixedFirst = (values: readonly MultiSelectOptionType[]) =>
  values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
