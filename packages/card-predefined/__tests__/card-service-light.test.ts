import type { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { TEST_IDS, VISIBILITY_STRATEGY } from '../src/components/CardServiceLight/constants';

// Cannot import from package types like constants above – this will lead to this test getting skipped by Playwright
type VisibilityStrategy = (typeof VISIBILITY_STRATEGY)[keyof typeof VISIBILITY_STRATEGY];

const TEST_ID = 'card-service-light-test';
const FAVORITE_INPUT_TEST_ID = `${TEST_IDS.favorite}-native-input`;

const STORY_OPTIONS = {
  category: 'console',
  group: 'cards',
  name: 'servicelight',
  story: 'service-light',
} as const;

const DEFAULT_PROPS = {
  'data-test-id': TEST_ID,
  title: 'Super duper long title so that is truncated',
  element: 'link',
  href: 'https://cloud.ru',
  promoTagMode: 'none',
  showFavorite: true,
} as const;

type FavoriteStoryConfig = {
  favoriteControlled: boolean;
  favoriteChecked: boolean;
  favoriteVisibilityStrategy: VisibilityStrategy;
};

type GoToStoryOptions = {
  category: string;
  group: string;
  name: string;
  story: string;
  props: Record<string, unknown>;
};

function favoriteWrapper(favorite: Locator) {
  return favorite.locator('xpath=..');
}

async function gotoFavoriteStory(gotoStory: (options: GoToStoryOptions) => Promise<void>, config: FavoriteStoryConfig) {
  await gotoStory({
    ...STORY_OPTIONS,
    props: {
      ...DEFAULT_PROPS,
      favoriteVisibilityStrategy: config.favoriteVisibilityStrategy,
      favoriteControlled: config.favoriteControlled,
      favoriteChecked: config.favoriteChecked,
    },
  });
}

/** В uncontrolled-режиме story не прокидывает `checked` — выставляем состояние кликом. */
async function ensureFavoriteChecked(
  page: Page,
  getByTestId: (testId: string) => Locator,
  card: Locator,
  config: Pick<FavoriteStoryConfig, 'favoriteControlled' | 'favoriteChecked'>,
) {
  if (!config.favoriteChecked || config.favoriteControlled) {
    return;
  }

  await card.hover();
  await getByTestId(FAVORITE_INPUT_TEST_ID).click({ force: true });
  // Сбрасываем hover, иначе favorite остаётся visible при visibilityStrategy: hover.
  await page.mouse.move(0, 0);
}

async function revealFavoriteForInteraction(card: Locator, favoriteVisibilityStrategy: VisibilityStrategy) {
  if (favoriteVisibilityStrategy === VISIBILITY_STRATEGY.hover) {
    await card.hover();
  }
}

function addFavoriteInteractionTests(favoriteControlled: boolean, favoriteVisibilityStrategy: VisibilityStrategy) {
  test('toggles on click', async ({ gotoStory, getByTestId }) => {
    await gotoFavoriteStory(gotoStory, {
      favoriteControlled,
      favoriteChecked: false,
      favoriteVisibilityStrategy,
    });

    const card = getByTestId(TEST_ID);
    const favoriteInput = getByTestId(FAVORITE_INPUT_TEST_ID);

    await revealFavoriteForInteraction(card, favoriteVisibilityStrategy);
    await expect(favoriteInput).not.toBeChecked();

    await favoriteInput.click({ force: true });

    await expect(favoriteInput).toBeChecked();
  });

  test('does not navigate when favorite is clicked on link card', async ({ gotoStory, getByTestId, page }) => {
    await gotoFavoriteStory(gotoStory, {
      favoriteControlled,
      favoriteChecked: false,
      favoriteVisibilityStrategy,
    });

    const initialUrl = page.url();
    const card = getByTestId(TEST_ID);

    await revealFavoriteForInteraction(card, favoriteVisibilityStrategy);
    await getByTestId(FAVORITE_INPUT_TEST_ID).click({ force: true });

    expect(page.url()).toBe(initialUrl);
  });

  test('moves focus from card to favorite with ArrowRight', async ({ gotoStory, getByTestId, page }) => {
    await gotoFavoriteStory(gotoStory, {
      favoriteControlled,
      favoriteChecked: false,
      favoriteVisibilityStrategy,
    });

    const card = getByTestId(TEST_ID);
    const favoriteInput = getByTestId(FAVORITE_INPUT_TEST_ID);

    await card.focus();
    await expect(card).toBeFocused();

    await page.keyboard.press('ArrowRight');

    await expect(favoriteInput).toBeFocused();
  });
}

test.describe('Card Service Light', () => {
  test('renders link with title and promo tag', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...STORY_OPTIONS,
      props: {
        ...DEFAULT_PROPS,
        showFavorite: false,
        promoTagMode: 'preview',
        promoTagContext: 'service',
        promoTagTooltipPlacement: 'top',
      },
    });

    const card = getByTestId(TEST_ID);

    await expect(getByTestId(TEST_IDS.title)).toHaveText(DEFAULT_PROPS.title);
    await expect(getByTestId(TEST_IDS.promoTag)).toHaveText('Preview');
    await expect(card).toHaveAttribute('href', DEFAULT_PROPS.href);
    await expect(card).toHaveRole('link');
  });

  test('renders button without href and promo tag when promo tag is disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      ...STORY_OPTIONS,
      props: {
        ...DEFAULT_PROPS,
        element: 'button',
        href: '',
        showFavorite: false,
      },
    });

    const card = getByTestId(TEST_ID);

    await expect(card).toHaveRole('button');
    await expect(card).not.toHaveAttribute('href');
    await expect(getByTestId(TEST_IDS.promoTag)).toHaveCount(0);
  });

  test.describe('favorite', () => {
    test.describe('uncontrolled', () => {
      const favoriteControlled = false;

      test.describe(`visibilityStrategy: ${VISIBILITY_STRATEGY.hover}`, () => {
        test('unchecked', async ({ gotoStory, getByTestId }) => {
          const config: FavoriteStoryConfig = {
            favoriteControlled,
            favoriteChecked: false,
            favoriteVisibilityStrategy: VISIBILITY_STRATEGY.hover,
          };

          await gotoFavoriteStory(gotoStory, config);

          const card = getByTestId(TEST_ID);
          const favorite = getByTestId(TEST_IDS.favorite);
          const wrapper = favoriteWrapper(favorite);

          await expect(wrapper).toHaveAttribute('data-visibility-strategy', VISIBILITY_STRATEGY.hover);
          await expect(wrapper).not.toHaveAttribute('data-checked');
          await expect(wrapper).toHaveCSS('position', 'absolute');
          await expect(favorite).toBeHidden();

          await card.hover();

          await expect(favorite).toBeVisible();
        });

        test('checked', async ({ gotoStory, getByTestId, page }) => {
          const config: FavoriteStoryConfig = {
            favoriteControlled,
            favoriteChecked: true,
            favoriteVisibilityStrategy: VISIBILITY_STRATEGY.hover,
          };

          await gotoFavoriteStory(gotoStory, config);

          const card = getByTestId(TEST_ID);
          const favorite = getByTestId(TEST_IDS.favorite);
          const wrapper = favoriteWrapper(favorite);

          await ensureFavoriteChecked(page, getByTestId, card, config);

          await expect(wrapper).toHaveAttribute('data-visibility-strategy', VISIBILITY_STRATEGY.hover);
          await expect(wrapper).toHaveAttribute('data-checked', 'true');
          await expect(wrapper).toHaveCSS('position', 'absolute');
          await expect(favorite).toBeHidden();

          await card.hover();

          await expect(favorite).toBeVisible();
          await expect(wrapper).not.toHaveCSS('position', 'absolute');
        });

        addFavoriteInteractionTests(favoriteControlled, VISIBILITY_STRATEGY.hover);
      });

      test.describe(`visibilityStrategy: ${VISIBILITY_STRATEGY.always}`, () => {
        test('unchecked', async ({ gotoStory, getByTestId }) => {
          const config: FavoriteStoryConfig = {
            favoriteControlled,
            favoriteChecked: false,
            favoriteVisibilityStrategy: VISIBILITY_STRATEGY.always,
          };

          await gotoFavoriteStory(gotoStory, config);

          const favorite = getByTestId(TEST_IDS.favorite);
          const wrapper = favoriteWrapper(favorite);

          await expect(wrapper).toHaveAttribute('data-visibility-strategy', VISIBILITY_STRATEGY.always);
          await expect(wrapper).not.toHaveAttribute('data-checked');
          await expect(wrapper).not.toHaveCSS('position', 'absolute');
          await expect(favorite).toBeVisible();
        });

        test('checked', async ({ gotoStory, getByTestId, page }) => {
          const config: FavoriteStoryConfig = {
            favoriteControlled,
            favoriteChecked: true,
            favoriteVisibilityStrategy: VISIBILITY_STRATEGY.always,
          };

          await gotoFavoriteStory(gotoStory, config);

          const card = getByTestId(TEST_ID);
          const favorite = getByTestId(TEST_IDS.favorite);
          const wrapper = favoriteWrapper(favorite);

          await ensureFavoriteChecked(page, getByTestId, card, config);

          await expect(wrapper).toHaveAttribute('data-visibility-strategy', VISIBILITY_STRATEGY.always);
          await expect(wrapper).toHaveAttribute('data-checked', 'true');
          await expect(wrapper).not.toHaveCSS('position', 'absolute');
          await expect(favorite).toBeVisible();
        });

        addFavoriteInteractionTests(favoriteControlled, VISIBILITY_STRATEGY.always);
      });
    });

    test.describe('controlled', () => {
      const favoriteControlled = true;

      test.describe(`visibilityStrategy: ${VISIBILITY_STRATEGY.hover}`, () => {
        test('unchecked', async ({ gotoStory, getByTestId }) => {
          const config: FavoriteStoryConfig = {
            favoriteControlled,
            favoriteChecked: false,
            favoriteVisibilityStrategy: VISIBILITY_STRATEGY.hover,
          };

          await gotoFavoriteStory(gotoStory, config);

          const card = getByTestId(TEST_ID);
          const favorite = getByTestId(TEST_IDS.favorite);
          const wrapper = favoriteWrapper(favorite);

          await expect(wrapper).toHaveAttribute('data-visibility-strategy', VISIBILITY_STRATEGY.hover);
          await expect(wrapper).not.toHaveAttribute('data-checked');
          await expect(wrapper).toHaveCSS('position', 'absolute');
          await expect(favorite).toBeHidden();

          await card.hover();

          await expect(favorite).toBeVisible();
        });

        test('checked', async ({ gotoStory, getByTestId }) => {
          const config: FavoriteStoryConfig = {
            favoriteControlled,
            favoriteChecked: true,
            favoriteVisibilityStrategy: VISIBILITY_STRATEGY.hover,
          };

          await gotoFavoriteStory(gotoStory, config);

          const card = getByTestId(TEST_ID);
          const favorite = getByTestId(TEST_IDS.favorite);
          const wrapper = favoriteWrapper(favorite);

          await expect(wrapper).toHaveAttribute('data-visibility-strategy', VISIBILITY_STRATEGY.hover);
          await expect(wrapper).toHaveAttribute('data-checked', 'true');
          await expect(wrapper).toHaveCSS('position', 'absolute');
          await expect(favorite).toBeHidden();

          await card.hover();

          await expect(favorite).toBeVisible();
        });

        addFavoriteInteractionTests(favoriteControlled, VISIBILITY_STRATEGY.hover);
      });

      test.describe(`visibilityStrategy: ${VISIBILITY_STRATEGY.always}`, () => {
        test('unchecked', async ({ gotoStory, getByTestId }) => {
          const config: FavoriteStoryConfig = {
            favoriteControlled,
            favoriteChecked: false,
            favoriteVisibilityStrategy: VISIBILITY_STRATEGY.always,
          };

          await gotoFavoriteStory(gotoStory, config);

          const favorite = getByTestId(TEST_IDS.favorite);
          const wrapper = favoriteWrapper(favorite);

          await expect(wrapper).toHaveAttribute('data-visibility-strategy', VISIBILITY_STRATEGY.always);
          await expect(wrapper).not.toHaveAttribute('data-checked');
          await expect(wrapper).not.toHaveCSS('position', 'absolute');
          await expect(favorite).toBeVisible();
        });

        test('checked', async ({ gotoStory, getByTestId }) => {
          const config: FavoriteStoryConfig = {
            favoriteControlled,
            favoriteChecked: true,
            favoriteVisibilityStrategy: VISIBILITY_STRATEGY.always,
          };

          await gotoFavoriteStory(gotoStory, config);

          const favorite = getByTestId(TEST_IDS.favorite);
          const wrapper = favoriteWrapper(favorite);

          await expect(wrapper).toHaveAttribute('data-visibility-strategy', VISIBILITY_STRATEGY.always);
          await expect(wrapper).toHaveAttribute('data-checked', 'true');
          await expect(wrapper).not.toHaveCSS('position', 'absolute');
          await expect(favorite).toBeVisible();
        });

        addFavoriteInteractionTests(favoriteControlled, VISIBILITY_STRATEGY.always);
      });
    });
  });
});
