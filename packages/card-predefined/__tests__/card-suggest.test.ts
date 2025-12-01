import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'card-suggest-test';

test.describe('Card Suggest', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      category: 'console',
      group: 'cards',
      name: 'suggest',
      props: {
        'data-test-id': TEST_ID,
        title: 'Super title',
        description: 'Super description',
      },
    });

    await expect(getByTestId('card__header__title')).toHaveText('Super title');
    await expect(getByTestId('card-suggest__description')).toHaveText('Super description');
  });
});
