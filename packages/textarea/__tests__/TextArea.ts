import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'textarea-test';

const visit = (props?: Record<string, unknown>) =>
  getTestcafeUrl({
    name: 'textarea',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Text field');

test.page(
  visit({
    value: '',
    minRows: 1,
    maxLength: 3,
    onChange: () => {},
    optional: false,
  }),
)(
  `Should be minimum 1 row, allow entering characters up to the limit and the clear button should remove entered value`,
  async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const input = wrapper.find(dataTestIdSelector('textarea__input'));
    const clearButton = wrapper.find(dataTestIdSelector('textarea__clear-button'));
    const counter = wrapper.find(dataTestIdSelector('input-wrapper__length-counter'));

    const height = await input.getStyleProperty('height');
    await t.expect(height).eql('31px');

    await t.expect(input.value).eql('').expect(counter.textContent).eql('0/3').expect(clearButton.visible).notOk();

    await t.typeText(input, '1234').expect(input.value).eql('123').expect(counter.textContent).eql('3/3');
    await t.click(clearButton).expect(input.value).eql('').expect(counter.textContent).eql('0/3');
  },
);

test.page(
  visit({
    value: '',
    onChange: () => {},
    disabled: true,
  }),
)(`Should not allow data entry if disabled`, async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('textarea__input'));

  await t.typeText(input, '123').expect(input.value).eql('').expect(input.hasAttribute('disabled')).ok();
});

test.page(
  visit({
    value: '',
    onChange: () => {},
    maxRows: 10,
  }),
)(`Should be minimum 3 rows by default and support automatic resize up to 10 rows`, async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('textarea__input'));

  const height = await input.getStyleProperty('height');
  await t.expect(height).eql('71px');

  await t.typeText(input, [...Array(10).keys()].join('\n'));

  const tenRowsHeight = await input.getStyleProperty('height');
  await t.expect(tenRowsHeight).eql('211px');

  await t.typeText(input, [...Array(5).keys()].join('\n'));

  const stillTenRowsHeight = await input.getStyleProperty('height');
  await t.expect(stillTenRowsHeight).eql('211px');
});
