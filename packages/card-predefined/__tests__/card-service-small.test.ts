import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'card-service-small-test';

test.describe('Card Service Small', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      category: 'console',
      group: 'cards',
      name: 'servicesmall',
      story: 'service-small',
      props: {
        'data-test-id': TEST_ID,
        title: 'Super title',
        description: 'Super description',
        promoBadgeMode: 'preview',
      },
    });

    await expect(getByTestId('card-service-small__title')).toHaveText('Super title');
    await expect(getByTestId('card-service-small__promo-badge')).toHaveText('Preview');
  });
});
