import { extractProps } from './extractProps';

export function extractSupportProps(props: any) {
  return extractProps(props, /^(data-test|aria)-/);
}
