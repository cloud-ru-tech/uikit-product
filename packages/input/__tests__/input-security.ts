import { fixture, Selector } from 'testcafe';

import { InputSecurityProps } from '@sbercloud/uikit-product-input';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests } from './utils';

fixture('[Input Security]:');

const testId = 'inputSecurity-test';

const visit = (props?: InputSecurityProps): string =>
  getTestcafeUrl({
    group: 'input',
    name: 'security',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });

test.page(
  visit({
    onChange: () => {},
  }),
)(
  'Should allow data entry but hide the value, and the show content button should reveal the protected value, and the clear button should remove the value',
  async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const input = wrapper.find(dataTestIdSelector('private-input'));
    const showPasswordButton = wrapper.find(dataTestIdSelector('input__show-password-button'));
    const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

    const sampleText = 'Hello world!';

    await t.expect(input.value).eql('');
    await t.expect(showPasswordButton.exists).notOk();
    await t
      .typeText(input, sampleText)
      .expect(input.value)
      .eql(sampleText)
      .expect(input.getAttribute('type'))
      .eql('password');
    await t.click(showPasswordButton).expect(input.getAttribute('type')).eql('text');

    await t.click(clearButton).expect(input.value).eql('');
  },
);

runCommonTests(
  props =>
    visit({
      ...props,
      onChange: () => {},
    }),
  testId,
  { isMasked: true },
);
