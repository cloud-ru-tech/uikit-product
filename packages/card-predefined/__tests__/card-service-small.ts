import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'card-service-small-test';

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    category: 'console',
    group: 'cards',
    name: 'servicesmall',
    story: 'service-small',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Card Service Small');

test.page(getPage({ title: 'Super title', description: 'Super description', promoBadge: 'badge' }))(
  'Rendered',
  async t => {
    await t.expect(Selector(dataTestIdSelector('card-service-small__title')).textContent).eql('Super title');
    await t.expect(Selector(dataTestIdSelector('card-service-small__promo-badge')).textContent).eql('badge');
  },
);
