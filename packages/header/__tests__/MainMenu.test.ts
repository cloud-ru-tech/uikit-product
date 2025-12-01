import { test } from '../../../playwright/fixtures';
import { basic } from './helpers/basic';
import { HEADER_TEST_ID } from './helpers/constants';
import { searchTests } from './helpers/search';

test.describe('Product Header Main Menu', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({
      category: 'console',
      name: 'header-main-menu',
      story: 'main-menu',
      globals: { brand: 'Cloud', locale: 'en-GB' },
      props: { 'data-test-id': HEADER_TEST_ID },
    });
  });

  basic();
  searchTests();
});
