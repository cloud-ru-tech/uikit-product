import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('Status Badge').page(
  getTestcafeUrl({
    name: 'status-badge',
    group: 'status',
    props: {
      'data-test-id': 'status-badge',
    },
  }),
);

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('status-badge')).exists).ok();
});
