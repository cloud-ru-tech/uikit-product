import { extractProps } from './extractProps';

export function extractDataTestProps(props: any) {
  return extractProps(props, /^data-test-/);
}
