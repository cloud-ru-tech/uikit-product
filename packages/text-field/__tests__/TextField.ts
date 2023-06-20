import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Types } from '../src/components/constants';

const testId = 'text-field-test';
const singleLineText = 'Hello world';
const multilineText = `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
Lorem Ipsum`;
const passwordText = 'super-secret-password';

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    name: 'text-field',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });
}

fixture('Text field');

test.page(
  getPage({
    text: singleLineText,
    type: Types.OneLine,
    allowCopy: false,
  }),
)('Renders a one line input field without copy button', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();

  const firstField = Selector(dataTestIdSelector(testId));
  const input = firstField.find(dataTestIdSelector('text-field__value'));

  await t.expect(input.tagName).eql('input');
  await t.expect(input.hasAttribute('disabled')).ok();

  await t.expect(input.value).eql(singleLineText);
  await t.expect(firstField.find(dataTestIdSelector('text-field__show-hide-button')).exists).notOk();

  await t.expect(firstField.find(dataTestIdSelector('text-field__copy-button')).exists).notOk();
});

test.page(
  getPage({
    type: Types.MultiLine,
  }),
)('Renders a multiline textarea field with copy button', async t => {
  await t.setNativeDialogHandler(() => '');
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();

  const firstField = Selector(dataTestIdSelector(testId));
  const textarea = firstField.find(dataTestIdSelector('text-field__value'));

  await t.expect(textarea.tagName).eql('textarea');
  await t.expect(textarea.hasAttribute('disabled')).ok();

  await t.expect(textarea.value).contains(multilineText);
  await t.expect(firstField.find(dataTestIdSelector('text-field__show-hide-button')).exists).notOk();

  await t.click(firstField.find(dataTestIdSelector('text-field__copy-button')));
  const prompt = await t.getNativeDialogHistory();
  await t.expect(prompt[0].text).contains('Copy to clipboard');
});

test.page(
  getPage({
    text: passwordText,
    type: Types.Password,
    allowCopy: true,
  }),
)(
  'Password field contents are hidden and can be access by clicking the secured icon or by copying value by clicking the copy button',
  async t => {
    await t.setNativeDialogHandler(() => '');

    const firstField = Selector(dataTestIdSelector(testId));
    const input = firstField.find(dataTestIdSelector('text-field__value'));

    await t.expect(input.tagName).eql('input');
    await t.expect(input.hasAttribute('disabled')).ok();

    await t.expect(input.getAttribute('type')).eql('password');
    await t.expect(input.getAttribute('data-secured')).eql('true');
    await t.expect(input.value).eql(passwordText);

    await t.click(firstField.find(dataTestIdSelector('text-field__copy-button')));

    const prompt = await t.getNativeDialogHistory();
    await t.expect(prompt[0].text).contains('Copy to clipboard');

    await t.click(firstField.find(dataTestIdSelector('text-field__show-hide-button')));
    await t.expect(input.getAttribute('type')).eql('text');
  },
);

test.page(getPage())('Secured text field will provide data once the secure icon is clicked', async t => {
  const securedFieldWithLoading = Selector(dataTestIdSelector('secured-content-preloading'));
  const input = securedFieldWithLoading.find(dataTestIdSelector('text-field__value'));

  await t.expect(input.hasAttribute('disabled')).ok();

  await t.expect(input.getAttribute('type')).eql('password');
  await t.expect(input.getAttribute('data-secured')).eql('true');
  await t.expect(input.value).contains('Lorem Ipsum - это текст-"рыба", часто используемый');

  await t.click(securedFieldWithLoading.find(dataTestIdSelector('text-field__show-hide-button')));
  await t.expect(input.getAttribute('type')).eql('text');
  await t.expect(input.value).eql('securedText');
});
