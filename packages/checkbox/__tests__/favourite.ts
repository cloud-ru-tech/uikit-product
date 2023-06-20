import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'favorite__test';

const visit = (props?: Record<string, unknown>) =>
  getTestcafeUrl({
    group: 'checkbox',
    name: 'favourite',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });

fixture('Favourite');

test.page(visit())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});

test.page(visit())('Checked after click and unchecked after another click', async t => {
  const input = Selector(dataTestIdSelector(testId)).find('input');
  await t.expect(input.checked).notOk();

  await t.click(Selector(dataTestIdSelector(testId)));
  await t.expect(input.checked).ok();

  await t.click(Selector(dataTestIdSelector(testId)));
  await t.expect(input.checked).notOk();
});

test.page(visit({ disabled: true, checked: false, handleChange: () => {} }))(
  'If disabled, nothing should happen after click',
  async t => {
    const input = Selector(dataTestIdSelector(testId)).find('input');

    await t.expect(input.checked).notOk();
    await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-disabled')).ok();

    await t.click(Selector(dataTestIdSelector(testId)));
    await t.expect(input.checked).notOk();
  },
);
