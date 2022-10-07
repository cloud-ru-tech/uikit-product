import { fixture, Selector, test } from 'testcafe';

import { InputRangeProps } from '@sbercloud/uikit-product-input-slider';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'input-range-test';
const ComponentSelector = Selector(dataTestIdSelector(TEST_ID));

const InputMinSelector = Selector(ComponentSelector.find(dataTestIdSelector('input-slider__input-min')));
const InputMaxSelector = Selector(ComponentSelector.find(dataTestIdSelector('input-slider__input-max')));

const LeftHandlerSelector = Selector(ComponentSelector.find('.rc-slider-handle-1'));
const RightHandlerSelector = Selector(ComponentSelector.find('.rc-slider-handle-2'));
const MarksSelector = Selector(ComponentSelector.find('.rc-slider-mark'));

function getPage(props?: Partial<InputRangeProps>) {
  return getTestcafeUrl({
    name: 'input-range',
    group: 'input-slider',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Input Range').page(getPage());

const DEFAULT_MIN = 20;
const DEFAULT_MAX = 80;

test.page(getPage({ value: [DEFAULT_MIN, DEFAULT_MAX], disabled: true }))('No way to change for disabled', async t => {
  const min = String(DEFAULT_MIN);
  const max = String(DEFAULT_MAX);
  await t.expect(InputMinSelector.value).eql(min);
  await t.expect(InputMaxSelector.value).eql(max);

  await t.typeText(InputMinSelector, '50');
  await t.expect(InputMinSelector.value).eql(min);
  await t.typeText(InputMaxSelector, '50');
  await t.expect(InputMaxSelector.value).eql(max);

  await t.drag(LeftHandlerSelector, 50, 0);
  await t.expect(InputMinSelector.value).eql(min);
  await t.drag(LeftHandlerSelector, -50, 0);
  await t.expect(InputMinSelector.value).eql(min);

  await t.drag(RightHandlerSelector, 50, 0);
  await t.expect(InputMaxSelector.value).eql(max);
  await t.drag(RightHandlerSelector, -50, 0);
  await t.expect(InputMaxSelector.value).eql(max);

  await t.click(LeftHandlerSelector).pressKey('right');
  await t.expect(InputMinSelector.value).eql(min);
  await t.click(LeftHandlerSelector).pressKey('left');
  await t.expect(InputMinSelector.value).eql(min);

  await t.click(RightHandlerSelector).pressKey('right');
  await t.expect(InputMaxSelector.value).eql(max);
  await t.click(RightHandlerSelector).pressKey('left');
  await t.expect(InputMaxSelector.value).eql(max);
});

test.page(getPage({ value: [DEFAULT_MIN, DEFAULT_MAX], min: 0, max: 100 }))(
  'Change by typing, pressing left/right arrow, dragging handler',
  async t => {
    const min = String(DEFAULT_MIN);
    const max = String(DEFAULT_MAX);
    await t.expect(InputMinSelector.value).eql(min);
    await t.expect(InputMaxSelector.value).eql(max);

    await t.typeText(InputMinSelector, '50', { replace: true, paste: true });
    await t.expect(InputMinSelector.value).eql('50');
    await t.typeText(InputMaxSelector, '70', { replace: true, paste: true });
    await t.expect(InputMaxSelector.value).eql('70');

    await t.click(LeftHandlerSelector).pressKey('right');
    await t.expect(InputMinSelector.value).eql('51');
    await t.click(LeftHandlerSelector).pressKey('left');
    await t.expect(InputMinSelector.value).eql('50');

    await t.click(RightHandlerSelector).pressKey('right');
    await t.expect(InputMaxSelector.value).eql('71');
    await t.click(RightHandlerSelector).pressKey('left');
    await t.expect(InputMaxSelector.value).eql('70');

    await t.drag(LeftHandlerSelector, 50, 0);
    await t.expect(InputMinSelector.value).notEql('50');

    await t.drag(RightHandlerSelector, -50, 0);
    await t.expect(InputMaxSelector.value).notEql('70');
  },
);

test.page(getPage({ value: [DEFAULT_MIN, DEFAULT_MAX], min: 0, max: 100 }))('Min/Max processing', async t => {
  const min = String(DEFAULT_MIN);
  const max = String(DEFAULT_MAX);
  await t.expect(InputMinSelector.value).eql(min);
  await t.expect(InputMaxSelector.value).eql(max);

  await t.typeText(InputMinSelector, '-1000', { replace: true, paste: true });
  await t.expect(InputMinSelector.value).eql('0');
  await t.expect(InputMaxSelector.value).eql(max);
  await t.click(LeftHandlerSelector).pressKey('left left left');
  await t.expect(InputMinSelector.value).eql('0');
  await t.expect(InputMaxSelector.value).eql(max);
  await t.drag(LeftHandlerSelector, -500, 0);
  await t.expect(InputMinSelector.value).eql('0');
  await t.expect(InputMaxSelector.value).eql(max);

  await t.typeText(InputMinSelector, min, { replace: true, paste: true });
  await t.expect(InputMinSelector.value).eql(min);
  await t.expect(InputMaxSelector.value).eql(max);

  await t.typeText(InputMaxSelector, '1000', { replace: true, paste: true });
  await t.expect(InputMinSelector.value).eql(min);
  await t.expect(InputMaxSelector.value).eql('100');
  await t.click(RightHandlerSelector).pressKey('right right right');
  await t.expect(InputMinSelector.value).eql(min);
  await t.expect(InputMaxSelector.value).eql('100');
  await t.drag(RightHandlerSelector, 500, 0);
  await t.expect(InputMinSelector.value).eql(min);
  await t.expect(InputMaxSelector.value).eql('100');
});

test.page(getPage({ min: 0, max: 100, marks: undefined }))('Min/Max marks always shown', async t => {
  await t.expect(MarksSelector.child().withExactText('0').exists).ok();
  await t.expect(MarksSelector.child().withExactText('100').exists).ok();
});
