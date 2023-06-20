import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests } from './utils';

fixture('[Input Phone]:');

const testId = 'inputPhone-test';

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'input',
    name: 'phone',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });

test.page(
  visit({
    onChange: () => {},
  }),
)('Should allow data entry and the clear button should remove entered value', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('private-input'));
  const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

  await t.expect(input.value).eql('');
  await t.typeText(input, 'Test').expect(input.value).notEql('Test');
  await t.typeText(input, '111').expect(input.value).eql('111 XXX-XX-XX');
  await t.typeText(input, '2223344').expect(input.value).eql('111 222-33-44');

  await t.click(clearButton).expect(input.value).eql('XXX XXX-XX-XX');
});

runCommonTests(
  props =>
    visit({
      ...props,
      onChange: () => {},
    }),
  testId,
  { isMasked: true },
);
