import { fixture, Selector, test } from 'testcafe';

import { InputSliderProps } from '@sbercloud/uikit-product-input-slider';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'input-slider-test';
const ComponentSelector = Selector(dataTestIdSelector(TEST_ID));
const InputSelector = Selector(ComponentSelector.find(dataTestIdSelector('input-slider__input')));
const HandlerSelector = Selector(ComponentSelector.find('.rc-slider-handle'));
const MarksSelector = Selector(ComponentSelector.find('.rc-slider-mark'));

function getPage(props?: Partial<InputSliderProps>) {
  return getTestcafeUrl({
    name: 'input-slider',
    group: 'input-slider',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Input Slider').page(getPage());

test.page(getPage({ value: 50, disabled: true }))('No way to change for disabled', async t => {
  await t.expect(InputSelector.value).eql('50');

  await t.typeText(InputSelector, '10');
  await t.expect(InputSelector.value).eql('50');

  await t.drag(HandlerSelector, 50, 0);
  await t.expect(InputSelector.value).eql('50');

  await t.click(HandlerSelector).pressKey('right');
  await t.expect(InputSelector.value).eql('50');
});

test.page(getPage({ value: 50 }))('Change by typing, pressing left/right arrow, dragging handler', async t => {
  await t.expect(InputSelector.value).eql('50');

  await t.typeText(InputSelector, '10', { replace: true });
  await t.expect(InputSelector.value).eql('10');

  await t.click(HandlerSelector).pressKey('right right right');
  await t.expect(InputSelector.value).eql('13');

  await t.click(HandlerSelector).pressKey('left left');
  await t.expect(InputSelector.value).eql('11');

  await t.drag(HandlerSelector, 50, 0);
  await t.expect(InputSelector.value).notEql('11');
});

test.page(getPage({ value: 50, min: 0, max: 100 }))('Min/Max processing', async t => {
  await t.expect(InputSelector.value).eql('50');

  await t.typeText(InputSelector, '1000', { replace: true });
  await t.expect(InputSelector.value).eql('100');
  await t.drag(HandlerSelector, 500, 0);
  await t.expect(InputSelector.value).eql('100');
  await t.click(HandlerSelector).pressKey('right right right');
  await t.expect(InputSelector.value).eql('100');

  await t.typeText(InputSelector, '-1000', { replace: true, paste: true });
  await t.expect(InputSelector.value).eql('0');
  await t.drag(HandlerSelector, -500, 0);
  await t.expect(InputSelector.value).eql('0');
  await t.click(HandlerSelector).pressKey('left left left');
  await t.expect(InputSelector.value).eql('0');
});

test.page(getPage({ min: 0, max: 100, marks: undefined }))('Min/Max marks always shown', async t => {
  await t.expect(MarksSelector.child().withExactText('0').exists).ok();
  await t.expect(MarksSelector.child().withExactText('100').exists).ok();
});
