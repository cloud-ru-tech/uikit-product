import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('Radio').page(
  getTestcafeUrl({
    name: 'radio',
    group: 'radio',
    props: {
      'data-test-id': 'radio__test',
    },
  }),
);

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('radio__test')).exists).ok();
});
