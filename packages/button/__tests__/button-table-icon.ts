import { CommonButtonPropsWithOptionalTooltip } from '@sbercloud/uikit-product-button-private';

import { getTestcafeUrl } from '../../../testcafe/utils';
import { getButtonDataAfterClick } from './utils';

const testId = 'buttonTableIcon-test';
const managedLoadingTestId = `${testId}-managed-loading`;

function getPage(props?: CommonButtonPropsWithOptionalTooltip) {
  return getTestcafeUrl({
    group: 'button',
    name: 'button-table-icon',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });
}

fixture('[Button]: ButtonTableIcon');

test.page(getPage())('Icon has changed after click', async t => {
  const { prev, current } = await getButtonDataAfterClick({ t, testId: managedLoadingTestId });

  await t.expect(current.svgId).notEql(prev.svgId);
});

test.page(getPage({ disabled: true }))('Nothing should happen if button is disabled', async t => {
  const { prev, current } = await getButtonDataAfterClick({ t, testId: managedLoadingTestId });

  await t.expect(current.svgId).eql(prev.svgId);
});
