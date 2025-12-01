import { expect, test } from '../../../playwright/fixtures';
import { getSelectors } from './helpers/selectors';

test.describe('Product Header User Menu', () => {
  test('renders with full user menu', async ({ gotoStory, page }) => {
    await gotoStory({
      category: 'console',
      name: 'header-user-menu',
      story: 'user-menu',
      globals: { brand: 'Cloud', locale: 'en-GB' },
      props: {
        'data-test-id': 'header__user-menu__button',
        showUserMenu: true,
        showUserMenuManagement: true,
        showUserMenuLogout: true,
      },
    });

    const { selectors } = getSelectors(page);

    await selectors.userMenuButton.click();

    await expect(selectors.userMenuManageProfile).toBeVisible();
    await expect(selectors.userMenuSwitchTheme).toBeVisible();
    await expect(selectors.userMenuLogout).toBeVisible();
  });
});
