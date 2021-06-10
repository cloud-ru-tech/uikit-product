import { INPUT_PLACEHOLDER } from './constants';
import { TimeInputProps } from './types';

export const addSymbols = (str: string, length: number, symbol: string): string => {
  const lack = length - str.length;
  if (lack < 1) return str.slice(-str.length - lack);
  return str || symbol;
};

const mapValuePropLength = {
  day: 2,
  month: 2,
  year: 4,
};

export const splitDateFormatter = (valueProp: TimeInputProps, str: string): string =>
  addSymbols(str, mapValuePropLength[valueProp], INPUT_PLACEHOLDER[valueProp]);
