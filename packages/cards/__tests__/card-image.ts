import { fixture, Selector, test } from 'testcafe';

import { CardImageProps } from '@sbercloud/uikit-product-cards';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-image-test';

function getPage(props?: Partial<CardImageProps>) {
  return getTestcafeUrl({
    group: 'cards-card',
    name: 'image',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Image');

test.page(getPage({ title: 'Super title', description: 'Super description', signature: 'Super signature' }))(
  'Rendered',
  async t => {
    await t.expect(Selector(dataTestIdSelector('card-image__title')).textContent).eql('Super title');
    await t.expect(Selector(dataTestIdSelector('card-image__description')).textContent).eql('Super description');
    await t.expect(Selector(dataTestIdSelector('card-image__signature')).textContent).eql('Super signature');
  },
);

test.page(getPage({ title: 'Super title', description: undefined, signature: 'Super signature' }))(
  'Without description',
  async t => {
    await t.expect(Selector(dataTestIdSelector('card-image__title')).textContent).eql('Super title');
    await t.expect(Selector(dataTestIdSelector('card-image__description')).exists).notOk();
    await t.expect(Selector(dataTestIdSelector('card-image__signature')).textContent).eql('Super signature');
  },
);

test.page(getPage({ title: 'Super title', description: 'Super description', signature: undefined }))(
  'Without signature',
  async t => {
    await t.expect(Selector(dataTestIdSelector('card-image__title')).textContent).eql('Super title');
    await t.expect(Selector(dataTestIdSelector('card-image__description')).textContent).eql('Super description');
    await t.expect(Selector(dataTestIdSelector('card-image__signature')).exists).notOk();
  },
);
