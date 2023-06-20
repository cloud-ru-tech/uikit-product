import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests } from './utils';

fixture('[Input Overview]:');

const testId = 'inputOverview-test';

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'input',
    name: 'overview',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });

test.page(
  visit({
    onChange: () => {},
    onMoreButtonClick: () => {},
  }),
)('Should allow data entry and the clear button should remove entered value', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('private-input'));
  const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

  const sampleText = 'Hello world!';

  await t.expect(input.value).eql('');
  await t.typeText(input, sampleText).expect(input.value).eql(sampleText);

  await t.click(clearButton).expect(input.value).eql('');
});

test.page(
  visit({
    onChange: () => {},
    onMoreButtonClick: () => {},
    moreButtonTooltipText: 'More button tooltip text',
  }),
)('Should show a tooltip when the more button is hovered for several seconds', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const moreButton = wrapper.find(dataTestIdSelector('input__more-button'));
  const tooltip = Selector(dataTestIdSelector('button-tooltip__ButtonIconBase'));

  await t.hover(moreButton).expect(tooltip.textContent).eql('More button tooltip text');
});

runCommonTests(
  props =>
    visit({
      ...props,
      onChange: () => {},
      onMoreButtonClick: () => {},
    }),
  testId,
  { isMasked: false },
);
