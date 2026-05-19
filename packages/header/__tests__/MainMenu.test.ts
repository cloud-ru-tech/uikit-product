import { test } from '../../../playwright/fixtures';
import { basic } from './helpers/basic';
import { HEADER_TEST_ID } from './helpers/constants';
import { adminSearchTests, platformSearchTests, searchTests } from './helpers/search';

test.describe('Product Header Main Menu', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({
      category: 'console',
      name: 'header-main-menu',
      story: 'main-menu',
      globals: { brand: 'Cloud', locale: 'ru-RU' },
      props: { 'data-test-id': HEADER_TEST_ID, showSearch: true, showServiceGroups: true },
    });
  });

  basic();
  searchTests();
  platformSearchTests();
  adminSearchTests();
});

test.describe('Product Header Main Menu (mobile)', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({
      category: 'console',
      name: 'header-main-menu',
      story: 'main-menu',
      globals: { brand: 'Cloud', locale: 'ru-RU' },
      props: { 'data-test-id': HEADER_TEST_ID, isMobile: true, showSearch: true, showServiceGroups: true },
    });
  });

  searchTests({ isMobile: true });
  platformSearchTests({ isMobile: true });
  adminSearchTests({ isMobile: true });
});
