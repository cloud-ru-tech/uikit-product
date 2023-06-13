import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'switch-row-test';

const SwitchRowSelector = Selector(dataTestIdSelector(TEST_ID));

function getPage(props?: Record<string, unknown>) {
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

test.page(
  getPage({
    disabled: true,
    checked: false,
    disabledToggleTooltip: {
      title: 'test',
    },
  }),
)('Click on disabled has no result', async t => {
  await t.expect(SwitchRowSelector.find('input[type="checkbox"]').checked).notOk();

  await t.click(SwitchRowSelector);

  await t.expect(SwitchRowSelector.find('input[type="checkbox"]').checked).notOk();
});

test.page(getPage())('With title tooltip', async t => {
  const titleTooltip = SwitchRowSelector.find(dataTestIdSelector('switch-row__title')).child(
    '[data-test-trigger-id="tooltip__trigger-element"]',
  );

  await t.hover(titleTooltip);
  await t.expect(Selector(dataTestIdSelector('switch-row__title-tooltip')).exists).ok();
});

test.page(
  getPage({
    disabled: true,
    disabledToggleTooltip: {
      title: 'test',
    },
  }),
)('With disabled tooltip', async t => {
  const toggleTooltip = SwitchRowSelector.find(dataTestIdSelector('switch-row__switch')).parent(
    '[data-test-trigger-id="tooltip__trigger-element"]',
  );

  await t.hover(toggleTooltip);
  await t.expect(Selector(dataTestIdSelector('switch-row__toggle-tooltip')).exists).ok();
});

test.page(getPage({ disabled: true, disabledToggleTooltip: undefined, tooltip: undefined }))(
  'Without tooltips',
  async t => {
    await t
      .expect(
        SwitchRowSelector.find(dataTestIdSelector('switch-row__title')).child(
          '[data-test-trigger-id="tooltip__trigger-element"]',
        ).exists,
      )
      .notOk();
    await t
      .expect(
        SwitchRowSelector.find(dataTestIdSelector('switch-row__switch')).parent(
          '[data-test-trigger-id="tooltip__trigger-element"]',
        ).exists,
      )
      .notOk();
  },
);
