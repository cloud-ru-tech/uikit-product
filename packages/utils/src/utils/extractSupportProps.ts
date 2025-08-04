import { DATA_AND_ARIA_REGEXP } from './private/constants';
import { extractProps } from './private/extractProps';

export function extractSupportProps(props: Record<string, unknown>) {
  return extractProps(props, DATA_AND_ARIA_REGEXP);
}
