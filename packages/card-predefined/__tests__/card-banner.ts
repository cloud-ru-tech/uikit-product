import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-banner-test';

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    category: 'snack-uikit',
    group: 'cards',
    name: 'banner',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Banner');

test.page(getPage({ title: 'Super title', description: 'Super description' }))('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('card__header__title')).textContent).eql('Super title');
  await t.expect(Selector(dataTestIdSelector('card-banner__description')).textContent).eql('Super description');
});
