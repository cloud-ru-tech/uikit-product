import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'title-clickable';

const TEST_IDS = {
  content: `${TEST_ID}__content`,
  chevron: `${TEST_ID}__chevron`,
  icon: `${TEST_ID}__icon`,
  title: `${TEST_ID}__title`,
  avatar: `${TEST_ID}__avatar`,
  avatarLabel: `${TEST_ID}__avatar-label`,
  avatarSubtitle: `${TEST_ID}__avatar-subtitle`,
  subtitle: `${TEST_ID}__subtitle`,
  customNode: `${TEST_ID}__custom-node`,
};

const SlotVariants = {
  Title: 'title',
  TitleIcon: 'title with icon',
  Avatar: 'avatar',
  Custom: 'custom node',
};

import { Page } from '@playwright/test';

function getSelectors(page: Page) {
  const titleClickable = page.locator(`[data-test-id="${TEST_ID}"]`);
  const title = titleClickable.locator(`[data-test-id="${TEST_IDS.title}"]`);
  const icon = titleClickable.locator(`[data-test-id="${TEST_IDS.icon}"]`);
  const avatar = titleClickable.locator(`[data-test-id="${TEST_IDS.avatar}"]`);
  const label = titleClickable.locator(`[data-test-id="${TEST_IDS.avatarLabel}"]`);
  const subtitle = titleClickable.locator(`[data-test-id="${TEST_IDS.avatarSubtitle}"]`);
  const customNode = titleClickable.locator(`[data-test-id="${TEST_IDS.customNode}"]`);

  return {
    titleClickable,
    title,
    icon,
    avatar,
    label,
    subtitle,
    customNode,
  };
}

test.describe('TitleClickable', () => {
  test('should render with title', async ({ gotoStory, page }) => {
    await gotoStory({
      name: 'title-clickable',
      props: {
        'data-test-id': TEST_ID,
        title: 'Title clickable',
        slotMode: SlotVariants.Title,
      },
    });

    const { title, icon, avatar, label, subtitle } = getSelectors(page);

    await expect(title).toBeVisible();
    await expect(icon).not.toBeVisible();
    await expect(avatar).not.toBeVisible();
    await expect(label).not.toBeVisible();
    await expect(subtitle).not.toBeVisible();
  });

  test('should render with title and icon', async ({ gotoStory, page }) => {
    await gotoStory({
      name: 'title-clickable',
      props: {
        'data-test-id': TEST_ID,
        slotMode: SlotVariants.TitleIcon,
        title: 'Title clickable',
        icon: 'PlaceholderSVG',
      },
    });

    const { title, icon } = getSelectors(page);

    await expect(title).toBeVisible();
    await expect(icon).toBeVisible();
  });

  test('should render with avatar', async ({ gotoStory, page }) => {
    await gotoStory({
      name: 'title-clickable',
      props: {
        'data-test-id': TEST_ID,
        avatar: { name: 'Denis Villeneuve', showTwoSymbols: true, subtitle: 'duna@gmail.com' },
        slotMode: SlotVariants.Avatar,
      },
    });

    const { avatar, label, subtitle } = getSelectors(page);

    await expect(avatar).toBeVisible();
    await expect(label).toBeVisible();
    await expect(subtitle).toBeVisible();
  });

  test('should render with custom node', async ({ gotoStory, page }) => {
    await gotoStory({
      name: 'title-clickable',
      props: {
        'data-test-id': TEST_ID,
        children: '<div data-test-id="custom-node" />',
        slotMode: SlotVariants.Custom,
      },
    });

    const { customNode } = getSelectors(page);

    await expect(customNode).toBeVisible();
  });
});
