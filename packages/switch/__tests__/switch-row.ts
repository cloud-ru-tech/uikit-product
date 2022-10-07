import { fixture, Selector, test } from 'testcafe';

import { SwitchRowProps } from '@sbercloud/uikit-product-switch';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'switch-row-test';
const SwitchRowSelector = Selector(dataTestIdSelector(TEST_ID));

function getPage(props?: Partial<SwitchRowProps>) {
  return getTestcafeUrl({
    name: 'switch-row',
    group: 'switch',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Switch Row');

test.page(getPage({ disabled: false, checked: false }))('Toggle switch', async t => {
  await t.expect(SwitchRowSelector.find('input[type="checkbox"]').checked).notOk();

  await t.click(SwitchRowSelector);

  await t.expect(SwitchRowSelector.find('input[type="checkbox"]').checked).ok();
});

test.page(getPage({ disabled: true, checked: false }))('Click on disabled has no result', async t => {
  await t.expect(SwitchRowSelector.find('input[type="checkbox"]').checked).notOk();

  await t.click(SwitchRowSelector);

  await t.expect(SwitchRowSelector.find('input[type="checkbox"]').checked).notOk();
});

test.page(getPage())('With tooltip', async t => {
  await t.hover(SwitchRowSelector.find('[data-test-trigger-id="tooltip__trigger-element"]'));

  await t.expect(Selector(dataTestIdSelector('switch-row__tooltip')).exists).ok();
});

test.page(getPage({ tooltip: undefined }))('Without tooltip', async t => {
  await t.expect(SwitchRowSelector.find('[data-test-trigger-id="tooltip__trigger-element"]').exists).notOk();
});
