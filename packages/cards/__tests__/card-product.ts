import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-product-test';
const ControlledComponent = Selector(dataTestIdSelector(TEST_ID));
function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    group: 'cards-card',
    name: 'product',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Product');

test.page(
  getPage({
    title: 'Super title',
    description: 'Super description',
  }),
)('Rendered', async t => {
  await t.expect(ControlledComponent.find(dataTestIdSelector('card-product__title')).textContent).eql('Super title');
  await t
    .expect(ControlledComponent.find(dataTestIdSelector('card-product__description')).textContent)
    .eql('Super description');
});

test.page(
  getPage({
    title: 'Super title',
    description: undefined,
  }),
)('Without description', async t => {
  await t.expect(ControlledComponent.find(dataTestIdSelector('card-product__title')).textContent).eql('Super title');
  await t.expect(ControlledComponent.find(dataTestIdSelector('card-product__description')).textContent).eql('');
});
