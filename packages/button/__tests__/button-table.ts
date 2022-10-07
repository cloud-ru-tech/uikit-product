import { fixture } from 'testcafe';

import { ButtonTableProps } from '@sbercloud/uikit-product-button';

import { getTestcafeUrl } from '../../../testcafe/utils';
import { getButtonDataAfterClick } from './utils';

const testId = 'buttonTable-test';
const managedLoadingTestId = `${testId}-managed-loading`;
const text = 'Connect';
const loadingText = 'Loading';

function getPage(props?: Omit<ButtonTableProps, 'href'>) {
  return getTestcafeUrl({
    group: 'button',
    name: 'button-table',
    props: { 'data-test-id': testId, ...(props || {}) },
  });
}

fixture('[Button]: ButtonTable');

test.page(getPage({ text, loadingText }))('Icon and text has changed after click', async t => {
  const { prev, current } = await getButtonDataAfterClick({ t, testId: managedLoadingTestId });

  await t.expect(current.svgId).notEql(prev.svgId);
  await t.expect(current.innerText).eql(loadingText);
});

test.page(getPage({ text, loadingText, disabled: true }))('Nothing should happen if button is disabled', async t => {
  const { prev, current } = await getButtonDataAfterClick({ t, testId: managedLoadingTestId });

  await t.expect(current.svgId).eql(prev.svgId);
  await t.expect(current.innerText).eql(prev.innerText);
});
