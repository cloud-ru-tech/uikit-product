import { fixture, Selector, test } from 'testcafe';

import { SwitchProps } from '@sbercloud/uikit-product-switch';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'switch-test';
const SwitchSelector = Selector(dataTestIdSelector(TEST_ID));

function getPage(props?: Partial<SwitchProps>) {
  return getTestcafeUrl({
    name: 'switch',
    group: 'switch',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Switch');

test.page(getPage({ disabled: false, checked: false }))('Toggle switch', async t => {
  await t.expect(SwitchSelector.find('input[type="checkbox"]').checked).notOk();

  await t.click(SwitchSelector);

  await t.expect(SwitchSelector.find('input[type="checkbox"]').checked).ok();
});

test.page(getPage({ disabled: true, checked: false }))('Click on disabled has no result', async t => {
  await t.expect(SwitchSelector.find('input[type="checkbox"]').checked).notOk();

  await t.click(SwitchSelector);

  await t.expect(SwitchSelector.find('input[type="checkbox"]').checked).notOk();
});
