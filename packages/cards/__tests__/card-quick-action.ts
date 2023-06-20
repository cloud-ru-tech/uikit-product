import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-quick-action-test';
const ControlledComponent = Selector(dataTestIdSelector(TEST_ID));

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    group: 'cards-card',
    name: 'quick-action',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Quick Action');

test.page(getPage({ title: 'Super title', description: 'Super description' }))('Rendered', async t => {
  await t
    .expect(ControlledComponent.find(dataTestIdSelector('card-quick-action__title')).textContent)
    .eql('Super title');
  await t
    .expect(ControlledComponent.find(dataTestIdSelector('card-quick-action__description')).textContent)
    .eql('Super description');
});

test.page(getPage({ title: 'Super title', description: undefined }))('Without description', async t => {
  await t
    .expect(ControlledComponent.find(dataTestIdSelector('card-quick-action__title')).textContent)
    .eql('Super title');
  await t.expect(ControlledComponent.find(dataTestIdSelector('card-quick-action__description')).exists).notOk();
});
