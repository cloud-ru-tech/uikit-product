import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-service-test';

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    category: 'console',
    group: 'cards',
    name: 'service',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Service');

test.page(getPage({ title: 'Super title', description: 'Super description' }))('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('card__header__title')).textContent).eql('Super title');
  await t.expect(Selector(dataTestIdSelector('card-service__description')).textContent).eql('Super description');
});
