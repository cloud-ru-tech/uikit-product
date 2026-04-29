import { expect, test } from '../../../playwright/fixtures';
import { CHIP_CHOICE_TEST_IDS } from '../src/constants';

const CHIP_TEST_ID = 'chip-choice';

test.describe('Chip Choice Single', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('long list: opening single chip shows many options; last option can be scrolled into view', async ({
    gotoStory,
    page,
  }) => {
    await gotoStory({
      category: 'mobile',
      group: 'chips',
      name: 'chipchoice',
      story: 'chip-choice-single',
      props: {
        'data-test-id': CHIP_TEST_ID,
        showManyOptions: true,
        searchable: false,
        virtualized: false,
        scroll: true,
      },
    });

    await page.getByTestId(CHIP_TEST_ID).click();

    const droplist = page.getByTestId(CHIP_CHOICE_TEST_IDS.droplist);
    await expect(droplist).toBeVisible();
    await expect(droplist.getByText('Long list option 1', { exact: true })).toBeVisible();

    const lastOption = droplist.getByText('Long list option 45', { exact: true });
    await expect(lastOption).toBeAttached();

    await expect(lastOption).not.toBeInViewport();

    await lastOption.scrollIntoViewIfNeeded();

    await expect(lastOption).toBeInViewport();
  });
});
