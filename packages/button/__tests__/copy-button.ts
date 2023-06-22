import { getTestcafeUrl } from '../../../testcafe/utils';
import { getButtonDataAfterClick } from './utils';

const testId = 'copy-button-test';

enum CopyStrategy {
  None = 'None',
  Prevent = 'Prevent',
  ReplaceText = 'ReplaceText',
}

function getPage(props?: Record<string, unknown> & { copyStrategy?: CopyStrategy }) {
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

  await t.expect(current.svgId).notEql(prev.svgId);

  // TODO: fails in Chrome because getNativeDialogHistory() is empty
  if (t.browser.name === 'Firefox') {
    const prompt = await t.getNativeDialogHistory();
    await t.expect(prompt[0].text).contains('Copy to clipboard');
  }
});

test.page(getPage({ disabled: true }))('Nothing should happen if button is disabled', async t => {
  const { prev, current } = await getButtonDataAfterClick({ t, testId });

  const prompt = await t.getNativeDialogHistory();
  await t.expect(prompt).eql([]);
  await t.expect(current.svgId).eql(prev.svgId);
});

test.page(getPage({ copyStrategy: CopyStrategy.Prevent }))(
  'Nothing should happen if copy action is prevented as a result of async action and the icon has changed to loading and back to original',
  async t => {
    const { prev, current } = await getButtonDataAfterClick({ t, testId });
    await t.wait(2000);

    const prompt = await t.getNativeDialogHistory();
    await t.expect(prompt).eql([]);
    await t.expect(current.svgId).notEql(prev.svgId);
  },
);

test.page(getPage({ copyStrategy: CopyStrategy.ReplaceText }))(
  'Result from async function is copied to clipboard once loaded and the icon has changed to loading and to success',
  async t => {
    const { prev, current } = await getButtonDataAfterClick({ t, testId });
    await t.wait(5000);

    // TODO: fails in Chrome because getNativeDialogHistory() is empty
    if (t.browser.name === 'Firefox') {
      const prompt = await t.getNativeDialogHistory();
      await t.expect(prompt[0].text).contains('Copy to clipboard'); // TODO: cannot access prompt input value, in fact it is 'This text has been replaced'. The 'Copy to clipboard' is not inside the input value, it is in the prompt itself (non-editable, as question/description)
    }
    await t.expect(current.svgId).notEql(prev.svgId);
  },
);
