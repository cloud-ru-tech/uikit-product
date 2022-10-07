import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'checkbox__test';
const iconId = 'checkbox__icon';

const visit = () =>
  getTestcafeUrl({
    group: 'checkbox',
    name: 'checkbox',
    props: {
      'data-test-id': testId,
    },
  });

fixture('Checkbox');

test.page(visit())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});

test.page(visit())('Checked after click', async t => {
  await t.click(Selector(dataTestIdSelector(testId)));

  await t.expect(Selector(dataTestIdSelector(iconId)).exists).ok();
});
