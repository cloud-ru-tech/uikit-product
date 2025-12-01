import { expect as playwrightExpect, Locator, test as base } from '@playwright/test';

import { dataTestIdSelector, getStorybookUrl, StorybookUrlOptions } from './utils';

type PlaywrightFixtures = {
  gotoStory(options: StorybookUrlOptions): Promise<void>;
  getByTestId(testId: string): Locator;
};

export const test = base.extend<PlaywrightFixtures>({
  gotoStory: async ({ page }, customUse) => {
    await customUse(async (options: StorybookUrlOptions) => {
      const url = getStorybookUrl(options);
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      await page.waitForLoadState('load');

      const storybookLoaderLocator = page.locator('.sb-preparing-story .sb-loader');
      await playwrightExpect(storybookLoaderLocator).toBeHidden({ timeout: 10000 });

      const errorMessage = page.locator("text=/Couldn't find story|Unable to find story|Story not found/i");
      const errorVisible = await errorMessage.isVisible().catch(() => false);
      if (errorVisible) {
        throw new Error(`Story not found: ${url}`);
      }

      await playwrightExpect(page.locator('#story-root')).toBeVisible();
    });
  },
  getByTestId: async ({ page }, customUse) => {
    await customUse((testId: string) => page.locator(dataTestIdSelector(testId)));
  },
});

export { expect } from '@playwright/test';
