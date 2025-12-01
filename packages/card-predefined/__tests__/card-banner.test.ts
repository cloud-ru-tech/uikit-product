import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'card-banner-test';

test.describe('Card Banner', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      category: 'console',
      group: 'cards',
      name: 'banner',
      props: {
        'data-test-id': TEST_ID,
        title: 'Super title',
        description: 'Super description',
      },
    });

    await expect(getByTestId('card__header__title')).toHaveText('Super title');
    await expect(getByTestId('card-banner__description')).toHaveText('Super description');
  });
});
