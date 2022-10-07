import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('Scroll').page(
  getTestcafeUrl({
    name: 'scroll',
    props: {
      'data-test-id': 'scroll-test',
    },
  }),
);

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('scroll-test')).exists).ok();
});
