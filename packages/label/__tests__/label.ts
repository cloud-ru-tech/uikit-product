import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'label-test';

fixture('Label').page(
  getTestcafeUrl({
    name: 'label',
    props: {
      'data-test-id': TEST_ID,
    },
  }),
);

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
});
