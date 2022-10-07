import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'chip__test';

const visit = (props?: Partial<{ label: string; checked: boolean; disabled: boolean; handleChange: object }>) =>
  getTestcafeUrl({
    name: 'chip',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Chip');

test.page(visit())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});

test.page(visit())('Should be checked after click', async t => {
  await t.click(Selector(dataTestIdSelector(testId)));

  await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-checked')).ok();
});

test.page(
  visit({
    label: 'disabled',
    checked: false,
    disabled: true,
    handleChange() {},
  }),
)('disabled = true, should not be checked after click', async t => {
  await t.click(Selector(dataTestIdSelector(testId)));

  await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-checked')).notOk();
});
