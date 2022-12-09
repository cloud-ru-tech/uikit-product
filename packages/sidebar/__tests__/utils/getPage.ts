import { getTestcafeUrl } from '../../../../testcafe/utils';
import { itemIds, sidebarTestId } from './testData';

export function getPage() {
  return getTestcafeUrl({
    category: 'components',
    name: 'sidebar',
    story: 'sidebar',
    props: {
      active: itemIds.defaultActive,
      'data-test-id': sidebarTestId,
    },
  });
}
