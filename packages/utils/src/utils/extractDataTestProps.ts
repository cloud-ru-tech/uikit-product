import { DATA_TEST_REGEXP } from './private/constants';
import { extractProps } from './private/extractProps';

export function extractDataTestProps(props: object) {
  return extractProps(props, DATA_TEST_REGEXP);
}
