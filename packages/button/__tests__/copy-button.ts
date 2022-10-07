import { CommonButtonPropsWithOptionalTooltip } from '@sbercloud/uikit-product-button-private';

import { getTestcafeUrl } from '../../../testcafe/utils';
import { getButtonDataAfterClick } from './utils';

const testId = 'copy-button-test';

function getPage(props?: CommonButtonPropsWithOptionalTooltip) {
  return getTestcafeUrl({
    group: 'button',
    name: 'copy-button',
    props: {
      'data-test-id': testId,
      text: testId,
      ...(props || {}),
    },
  });
}

fixture('[Button]: CopyButton').beforeEach(async t => {
  await t.setNativeDialogHandler(() => '');
});

test.page(getPage())('Text is copied to clipboard and icon has changed after click', async t => {
  const { prev, current } = await getButtonDataAfterClick({ t, testId });

  const prompt = await t.getNativeDialogHistory();
  await t.expect(prompt[0].text).contains('Copy to clipboard');
  await t.expect(current.svgId).notEql(prev.svgId);
});

test.page(getPage({ disabled: true }))('Nothing should happen if button is disabled', async t => {
  const { prev, current } = await getButtonDataAfterClick({ t, testId });

  const prompt = await t.getNativeDialogHistory();
  await t.expect(prompt).eql([]);
  await t.expect(current.svgId).eql(prev.svgId);
});
