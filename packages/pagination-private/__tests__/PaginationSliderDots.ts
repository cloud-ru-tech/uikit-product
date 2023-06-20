import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function getPage(props: Record<string, unknown>) {
  return getTestcafeUrl({ group: 'pagination', name: 'pagination-slider-dots', props });
}

fixture('Pagination');

const testId = 'pagination-slider-dots';

test.page(getPage({ total: 7, page: 1, 'data-test-id': testId }))(
  'Clicking a pagination dot changes current page',
  async t => {
    await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(testId)).find('a[role="button"]').count).eql(7);

    const firstDot = Selector(dataTestIdSelector(testId)).find('li:first-of-type').find('a[role="button"]');
    const thirdDot = Selector(dataTestIdSelector(testId)).find('li:nth-of-type(3)').find('a[role="button"]');

    await t.expect(firstDot.getAttribute('data-selected')).eql('true');

    await t.click(thirdDot);
    await t.expect(firstDot.hasAttribute('data-selected')).notOk();
    await t.expect(thirdDot.getAttribute('data-selected')).eql('true');
  },
);
