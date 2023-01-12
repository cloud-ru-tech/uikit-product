import { fixture, Selector, test } from 'testcafe';

import { ModalProps } from '@sbercloud/uikit-product-modal';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Variant } from '../../modal-private/src/components/Container/constants';

const TEST_ID = 'modal-test';
function getPage(props?: Partial<ModalProps>) {
  return getTestcafeUrl({
    name: 'modal',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Modal').skipJsErrors(args => Boolean(args?.message.includes('ResizeObserver loop')));

test.page(getPage({ isOpen: false }))('Rendered modal', async t => {
  await t
    .click(Selector(dataTestIdSelector('modal-control-button')))
    .expect(Selector(dataTestIdSelector(TEST_ID)).exists)
    .ok();
});

test.page(getPage({ isOpen: true, title: 'test-title' }))('Rendered title', async t => {
  await t.expect(Selector(dataTestIdSelector('modal-private__header__title')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('modal-private__header__title')).innerText).eql('test-title');
});

test.page(getPage({ isOpen: true, subtitle: 'test-subtitle' }))('Rendered subtitle', async t => {
  await t.expect(Selector(dataTestIdSelector('modal-private__header__subtitle')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('modal-private__header__subtitle')).innerText).eql('test-subtitle');
});

test.page(getPage({ isOpen: true }))('Rendered content', async t => {
  await t.expect(Selector(dataTestIdSelector('modal-private__content')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('modal-private__content')).innerText).contains('Lorem ipsum');
});

test.page(getPage({ isOpen: true }))('Should scroll long content', async t => {
  const content = Selector(dataTestIdSelector('modal-private__content'));
  await t.scroll(content, 'bottom');
  await t.expect(content.scrollTop).notEql(0);
});

test.page(getPage({ isOpen: true, disableScroll: true } as Partial<ModalProps>))(
  `Shouldn't scroll content when disableScroll is true`,
  async t => {
    const content = Selector(dataTestIdSelector('modal-private__content'));

    await t.scroll(content, 'bottom');
    await t.expect(content.scrollTop).eql(0);
  },
);

test.page(getPage({ isOpen: false }))(`Shouldn't scroll when content fits the modal`, async t => {
  await t.click(Selector(dataTestIdSelector('modal-ex3-button')));

  const content = Selector(dataTestIdSelector('modal-private__content'));

  await t.scroll(content, 'bottom');
  await t.expect(content.scrollTop).eql(0);
});

test.page(getPage({ isOpen: true, isLoading: true }))(`Content is loading`, async t => {
  await t.expect(Selector(dataTestIdSelector('modal-private__footer')).exists).notOk();
  await t.expect(Selector(dataTestIdSelector('modal__spinner')).exists).ok();
});

test.page(getPage({ isOpen: true }))(`Renders footer with buttons (Approve, Cancel, Additional)`, async t => {
  await t.expect(Selector(dataTestIdSelector('modal-private__footer__approve-btn')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('modal-private__footer__approve-btn')).innerText).contains('Подтвердить');

  await t.expect(Selector(dataTestIdSelector('modal-private__footer__cancel-btn')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('modal-private__footer__cancel-btn')).innerText).contains('Удалить');

  await t.expect(Selector(dataTestIdSelector('modal-private__footer__additional-btn')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('modal-private__footer__additional-btn')).innerText).contains('Другое');
});

test.page(getPage({ isOpen: false }))(`Shouldn't execute callbacks when footer buttons are disabled`, async t => {
  await t
    .click(Selector(dataTestIdSelector('modal-ex3-button')))
    .click(Selector(dataTestIdSelector('modal-private__footer__approve-btn')))
    .click(Selector(dataTestIdSelector('modal-private__footer__cancel-btn')))
    .click(Selector(dataTestIdSelector('modal-private__footer__additional-btn')))
    .expect(Selector(dataTestIdSelector('modal-test-ex3')).exists)
    .ok();
});

test.page(getPage({ isOpen: false }))(
  'Executes callbacks on active footer buttons (Approve, Cancel, Additional)',
  async t => {
    await t
      .click(Selector(dataTestIdSelector('modal-ex2-button')))
      .click(Selector(dataTestIdSelector('modal-private__footer__approve-btn')))
      .expect(Selector(dataTestIdSelector('modal-test-ex2')).exists)
      .notOk();

    await t
      .click(Selector(dataTestIdSelector('modal-ex2-button')))
      .click(Selector(dataTestIdSelector('modal-private__footer__cancel-btn')))
      .expect(Selector(dataTestIdSelector('modal-test-ex2')).exists)
      .notOk();

    await t
      .click(Selector(dataTestIdSelector('modal-ex2-button')))
      .click(Selector(dataTestIdSelector('modal-private__footer__additional-btn')))
      .expect(Selector(dataTestIdSelector('modal-test-ex2')).exists)
      .notOk();
  },
);

test.page(getPage({ isOpen: true, variant: Variant.Regular }))(
  'Closes by click on overlay/close-button for Regular modal',
  async t => {
    await t
      .click(Selector(dataTestIdSelector('modal-private__overlay')))
      .expect(Selector(dataTestIdSelector(TEST_ID)).exists)
      .notOk();

    await t
      .click(Selector(dataTestIdSelector('modal-control-button')))
      .click(Selector(dataTestIdSelector('modal-private__close-btn')))
      .expect(Selector(dataTestIdSelector(TEST_ID)).exists)
      .notOk();
  },
);

test.page(getPage({ isOpen: true, variant: Variant.Aggressive }))(
  `Shouldn't close by click on overlay for Aggressive modal`,
  async t => {
    await t
      .click(Selector(dataTestIdSelector('modal-private__overlay')))
      .expect(Selector(dataTestIdSelector(TEST_ID)).exists)
      .ok();
  },
);
