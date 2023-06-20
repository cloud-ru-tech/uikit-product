import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'checkbox__test';
const checkedSvgIcon = 'icon-checkbox-checked';
const partlyCheckedSvgIcon = 'icon-checkbox-partial-checked';

const visit = (props?: Record<string, unknown>) =>
  getTestcafeUrl({
    group: 'checkbox',
    name: 'checkbox',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });

fixture('Checkbox');

test.page(visit())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});

test.page(visit())('Checked after click and unchecked after another click', async t => {
  const input = Selector(dataTestIdSelector(testId)).find('input');

  await t.expect(input.checked).notOk();

  await t.click(Selector(dataTestIdSelector(testId)));
  await t.expect(input.checked).ok();
  await t.expect(Selector(dataTestIdSelector(checkedSvgIcon)).exists).ok();

  await t.click(Selector(dataTestIdSelector(testId)));
  await t.expect(input.checked).notOk();
  await t.expect(Selector(dataTestIdSelector(checkedSvgIcon)).exists).notOk();
});

test.page(visit({ partChecked: true, checked: false, handleChange: () => {} }))('Partly checked rendered', async t => {
  const input = Selector(dataTestIdSelector(testId)).find('input');

  await t.expect(input.checked).notOk();
  await t.expect(Selector(dataTestIdSelector(partlyCheckedSvgIcon)).exists).ok();

  await t.click(Selector(dataTestIdSelector(testId)));
  await t.expect(input.checked).notOk();
  await t.expect(Selector(dataTestIdSelector(partlyCheckedSvgIcon)).exists).notOk();
});

test.page(visit({ disabled: true, checked: false, handleChange: () => {} }))(
  'If disabled, nothing should happen after click',
  async t => {
    const input = Selector(dataTestIdSelector(testId)).find('input');

    await t.expect(input.checked).notOk();
    await t.expect(Selector(dataTestIdSelector(checkedSvgIcon)).exists).notOk();

    await t.click(Selector(dataTestIdSelector(testId)));
    await t.expect(input.checked).notOk();
    await t.expect(Selector(dataTestIdSelector(checkedSvgIcon)).exists).notOk();
  },
);
