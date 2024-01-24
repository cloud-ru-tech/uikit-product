import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-suggest-test';

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    category: 'snack-uikit',
    group: 'cards',
    name: 'suggest',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Suggest');

test.page(getPage({ title: 'Super title', description: 'Super description' }))('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('card__header__title')).textContent).eql('Super title');
  await t.expect(Selector(dataTestIdSelector('card-suggest__description')).textContent).eql('Super description');
});
