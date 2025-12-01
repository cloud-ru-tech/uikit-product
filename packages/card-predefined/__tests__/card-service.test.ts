import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'card-service-test';

test.describe('Card Service', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      category: 'console',
      group: 'cards',
      name: 'service',
      props: {
        'data-test-id': TEST_ID,
        title: 'Super title',
        description: 'Super description',
      },
    });

    await expect(getByTestId('card__header__title')).toHaveText('Super title');
    await expect(getByTestId('card-service__description')).toHaveText('Super description');
  });
});
