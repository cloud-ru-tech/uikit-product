import { fixture, Selector, test } from 'testcafe';

import { CardWideProps } from '@sbercloud/uikit-product-cards';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-wide-test';

function getPage(props?: Partial<CardWideProps>) {
  return getTestcafeUrl({
    group: 'cards-card',
    name: 'wide',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Wide');

test.page(getPage({ title: 'Super title', description: 'Super description' }))('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('card-wide__title')).textContent).eql('Super title');
  await t.expect(Selector(dataTestIdSelector('card-wide__description')).textContent).eql('Super description');
});
