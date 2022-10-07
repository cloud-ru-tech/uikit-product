import { fixture, Selector, test } from 'testcafe';

import { CardResultProps } from '@sbercloud/uikit-product-cards';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-result-test';

function getPage(props?: Partial<CardResultProps>) {
  return getTestcafeUrl({
    group: 'cards-card',
    name: 'result',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Result');

test.page(getPage({ title: 'Super title', description: 'Super description' }))('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('card-result__title')).textContent).eql('Super title');
  await t.expect(Selector(dataTestIdSelector('card-result__description')).textContent).eql('Super description');
});
