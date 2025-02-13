import { CALCULATOR_DATA_TEST_ID } from '../constants';

export function parseKeyToDataTest(component: string, value?: string) {
  if (!value) {
    return `${CALCULATOR_DATA_TEST_ID}-${component}`;
  }

  const parsed = value
    .replace(/\./g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();

  return `${CALCULATOR_DATA_TEST_ID}-${component}-${parsed}`;
}
