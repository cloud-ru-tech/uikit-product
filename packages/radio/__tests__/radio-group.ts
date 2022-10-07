import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('Radio Group').page(
  getTestcafeUrl({
    name: 'radio-group',
    group: 'radio',
    props: {
      'data-test-id': 'test-group',
    },
  }),
);

test('Switch chosen option', async t => {
  const firstOption = Selector('*[data-test-option-id="Story0"]');
  const secondOption = Selector('*[data-test-option-id="Story1"]');

  await t.expect(firstOption.find(dataTestIdSelector('icon-radio-unchecked-interface')).exists).ok();
  await t.expect(secondOption.find(dataTestIdSelector('icon-radio-checked-interface')).exists).ok();

  await t.click(Selector(firstOption));

  await t.expect(firstOption.find(dataTestIdSelector('icon-radio-checked-interface')).exists).ok();
  await t.expect(secondOption.find(dataTestIdSelector('icon-radio-unchecked-interface')).exists).ok();
});

test('Click on disabled option has no result', async t => {
  const selectedOption = Selector('*[data-test-option-id="Story1"]');
  const disabledOption = Selector('*[data-test-option-id="Story2"]');

  await t.expect(disabledOption.find(dataTestIdSelector('icon-radio-unchecked-interface')).exists).ok();
  await t.expect(selectedOption.find(dataTestIdSelector('icon-radio-checked-interface')).exists).ok();

  await t.click(Selector(disabledOption));

  await t.expect(disabledOption.find(dataTestIdSelector('icon-radio-unchecked-interface')).exists).ok();
  await t.expect(selectedOption.find(dataTestIdSelector('icon-radio-checked-interface')).exists).ok();
});
