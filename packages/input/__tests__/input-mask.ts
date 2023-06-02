import { fixture, Selector } from 'testcafe';

import { InputMaskProps } from '@sbercloud/uikit-product-input';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests } from './utils';

fixture('[Input Mask]:');

const testId = 'inputMask-test';

const visit = (props?: InputMaskProps): string =>
  getTestcafeUrl({
    group: 'input',
    name: 'mask',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });

test.page(
  visit({
    onChange: () => {},
    mask: 'Phone' as InputMaskProps['mask'],
  }),
)('Phone: Should allow Russian phone format only and the clear button should remove entered value', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('private-input'));
  const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

  await t.expect(input.value).eql('');
  await t.typeText(input, 'Test').expect(input.value).notEql('Test');
  await t.typeText(input, '111222').expect(input.value).eql('+7 111 222-__-__');
  await t.typeText(input, '3344').expect(input.value).eql('+7 111 222-33-44');

  await t.click(clearButton).expect(input.value).eql('+7 ___ ___-__-__');
});

test.page(
  visit({
    onChange: () => {},
    mask: 'Passport' as InputMaskProps['mask'],
  }),
)('Passport: Should allow Russian passport format only and the clear button should remove entered value', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('private-input'));
  const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

  await t.expect(input.value).eql('');
  await t.typeText(input, 'Test').expect(input.value).notEql('Test');
  await t.typeText(input, '111122').expect(input.value).eql('1111 22____');
  await t.typeText(input, '3333').expect(input.value).eql('1111 223333');

  await t.click(clearButton).expect(input.value).eql('____ ______');
});

test.page(
  visit({
    onChange: () => {},
    mask: 'Snils' as InputMaskProps['mask'],
  }),
)('Snils: Should allow Russian snils number format only and the clear button should remove entered value', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('private-input'));
  const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

  await t.expect(input.value).eql('');
  await t.typeText(input, 'Test').expect(input.value).notEql('Test');
  await t.typeText(input, '1111').expect(input.value).eql('1111__-___ __');
  await t.typeText(input, '2233344').expect(input.value).eql('111122-333 44');

  await t.click(clearButton).expect(input.value).eql('______-___ __');
});

test.page(
  visit({
    onChange: () => {},
    mask: 'ConfirmationCode' as InputMaskProps['mask'],
  }),
)(
  'ConfirmationCode: Should allow 4 digit confirmation code only and the clear button should remove entered value',
  async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const input = wrapper.find(dataTestIdSelector('private-input'));
    const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

    await t.expect(input.value).eql('');
    await t.typeText(input, 'Test').expect(input.value).notEql('Test');
    await t.typeText(input, '11').expect(input.value).eql('11__');
    await t.typeText(input, '22').expect(input.value).eql('1122');

    await t.click(clearButton).expect(input.value).eql('____');
  },
);

test.page(
  visit({
    onChange: () => {},
    mask: 'IpV4Address' as InputMaskProps['mask'],
  }),
)('IpV4Address: Should allow correct characters and allow clean field', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('private-input'));
  const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

  await t.expect(input.value).eql('');
  await t.typeText(input, 'Test').expect(input.value).notEql('Test');
  await t.typeText(input, '10').expect(input.value).eql('10._._._');
  await t.typeText(input, '.10.0.1').expect(input.value).eql('10.10.0.1');

  await t.click(clearButton).expect(input.value).eql('_._._._');
});

test.page(
  visit({
    onChange: () => {},
    mask: 'IpV4AddressWithMask' as InputMaskProps['mask'],
  }),
)('IpV4AddressWithMask: Should render correct mask, allow correct characters for mask postfix', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('private-input'));
  const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

  await t.expect(input.value).eql('');
  await t.typeText(input, 'Test').expect(input.value).notEql('Test');
  await t.typeText(input, '10').expect(input.value).eql('10._._._/__');
  await t.typeText(input, '.10.0.1/32').expect(input.value).eql('10.10.0.1/32');

  await t.click(clearButton).expect(input.value).eql('_._._._/__');
});

runCommonTests(
  props =>
    visit({
      ...props,
      onChange: () => {},
      mask: 'Phone' as InputMaskProps['mask'],
    }),
  testId,
  { isMasked: true },
);

test.page(
  visit({
    onChange: () => {},
    mask: 'Date' as InputMaskProps['mask'],
  }),
)('Date: Should render correct mask, allow correct characters', async t => {
  const wrapper = Selector(dataTestIdSelector(testId));
  const input = wrapper.find(dataTestIdSelector('private-input'));
  const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));

  await t.expect(input.value).eql('');
  await t.typeText(input, 'Test').expect(input.value).eql('ДД.MM.ГГГГ');
  await t.typeText(input, '99').expect(input.value).eql('ДД.MM.ГГГГ');
  await t.typeText(input, '40309999').expect(input.value).eql('03.09.ГГГГ');
  await t.selectText(input).pressKey('delete');
  await t.typeText(input, '12').expect(input.value).eql('12.MM.ГГГГ');
  await t.selectText(input).pressKey('delete');
  await t.typeText(input, '1213').expect(input.value).eql('12.1M.ГГГГ');
  await t.selectText(input).pressKey('delete');
  await t.typeText(input, '1212').expect(input.value).eql('12.12.ГГГГ');
  await t.selectText(input).pressKey('delete');
  await t.typeText(input, '12121212').expect(input.value).eql('12.12.1ГГГ');
  await t.selectText(input).pressKey('delete');
  await t.typeText(input, '12121899').expect(input.value).eql('12.12.199Г');
  await t.selectText(input).pressKey('delete');
  await t.typeText(input, '12122023').expect(input.value).eql('12.12.2023');

  await t.click(clearButton).expect(input.value).eql('ДД.MM.ГГГГ');
});

runCommonTests(
  props =>
    visit({
      ...props,
      onChange: () => {},
      mask: 'Date' as InputMaskProps['mask'],
    }),
  testId,
  { isMasked: true },
);
