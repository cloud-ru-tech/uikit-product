import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('Status Dot').page(
  getTestcafeUrl({
    name: 'status-dot',
    group: 'status',
    props: {
      'data-test-id': 'status-dot',
    },
  }),
);

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('status-dot')).exists).ok();
});
