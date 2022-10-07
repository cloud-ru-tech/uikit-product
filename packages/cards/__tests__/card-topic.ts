import { fixture, Selector, test } from 'testcafe';

import { CardTopicProps } from '@sbercloud/uikit-product-cards';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-topic-test';

function getPage(props?: Partial<CardTopicProps>) {
  return getTestcafeUrl({
    group: 'cards-card',
    name: 'topic',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Topic');

test.page(getPage({ title: 'Super title' }))('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('card-topic__title')).textContent).eql('Super title');
});
