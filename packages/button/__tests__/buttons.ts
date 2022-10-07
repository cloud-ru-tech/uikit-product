import { Selector } from 'testcafe';

import { CommonButtonPropsWithOptionalTooltip } from '@sbercloud/uikit-product-button-private';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('[Button]');

const buttons = [
  {
    name: 'button',
    componentName: 'Button',
  },
  {
    name: 'button-ghost',
    componentName: 'ButtonGhost',
  },
  {
    name: 'button-icon',
    componentName: 'ButtonIcon',
  },
  {
    name: 'button-icon-transparent',
    componentName: 'ButtonIconTransparent',
  },
  {
    name: 'button-overlay',
    componentName: 'ButtonOverlay',
  },
  {
    name: 'button-round',
    componentName: 'ButtonRound',
  },
  {
    name: 'button-round-big',
    componentName: 'ButtonRoundBig',
  },
  {
    name: 'button-table',
    componentName: 'ButtonTable',
  },
  {
    name: 'button-table-icon',
    componentName: 'ButtonTableIcon',
  },
  {
    name: 'copy-button',
    componentName: 'ButtonIconTransparent',
    skipAsLink: true,
  },
  {
    name: 'refresh-button',
    componentName: 'ButtonIconTransparent',
    skipAsLink: true,
  },
];

buttons.forEach(button => {
  const testId = `${button.name}-test`;

  function getPage(props?: CommonButtonPropsWithOptionalTooltip) {
    return getTestcafeUrl({
      group: 'button',
      name: button.name,
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  test.page(getPage())(`${button.name}: Rendered`, async t => {
    await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
  });

  test.page(getPage({ tooltip: { content: testId } }))(`${button.name}: Tooltip is shown on hover`, async t => {
    await t.hover(Selector(dataTestIdSelector(testId)).nth(0));
    await t.expect(Selector(`[data-test-id*="button-tooltip__${button.componentName}"]`).visible).ok();
  });

  if (!button.skipAsLink) {
    test.page(getPage({ href: testId }))(`${button.name}: Should render as <a>`, async t => {
      await t.expect(Selector(`a[data-test-id="${testId}"]`).exists).ok();
    });
  }
});
