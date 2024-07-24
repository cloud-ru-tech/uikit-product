import { DATA_REGEXP } from './private/constants';
import { extractProps } from './private/extractProps';

export function extractDataProps(props: Record<string, unknown>) {
  return extractProps(props, DATA_REGEXP);
}
