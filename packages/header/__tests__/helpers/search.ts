import { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../../playwright/fixtures';
import { getSelectors } from './selectors';

type ExpectedSearchResultItem = {
  groupLabel: string;
  linkLabel: string;
};

enum Result {
  VirtualMachines = 'virtualMachines',
  Images = 'images',
  ApiGateway = 'apiGateway',
  ServerlessFunctions = 'serverlessFunctions',
  Vpc = 'vpc',
  FineTuning = 'fineTuning',
}

type SearchMenuItemConfig = {
  searchValue: string;
  expectedResults: {
    present: Result[];
    missing?: Result[];
  };
};

type SearchTestsOptions = {
  openSearchSelector?: Locator;
  isMobile?: boolean;
};

type EntityConfig = SearchTestsOptions & {
  queries: {
    precise: [string];
    fuzzy?: [string, ...string[]];
  };
  expectedResults: SearchMenuItemConfig['expectedResults'];
};

const EXPECTED_RESULTS: Record<Result, ExpectedSearchResultItem> = {
  [Result.VirtualMachines]: { groupLabel: 'Инфраструктура', linkLabel: 'Виртуальные машины' },
  [Result.Images]: { groupLabel: 'Инфраструктура', linkLabel: 'Образы' },
  [Result.ApiGateway]: { groupLabel: 'Разработка', linkLabel: 'API gateway' },
  [Result.ServerlessFunctions]: { groupLabel: 'Разработка', linkLabel: 'Serverless functions' },
  [Result.Vpc]: { groupLabel: 'Сеть', linkLabel: 'VPC' },
  [Result.FineTuning]: { groupLabel: 'ML/AI инструменты', linkLabel: 'ML Finetuning' },
};

const ALL_AVAILABLE_LINKS = Object.values(EXPECTED_RESULTS);

async function openMenuSearch(page: Page, openSearchSelector?: Locator) {
  const { selectors } = getSelectors(page);

  await selectors.drawerMenuButton.click();

  if (openSearchSelector) {
    await openSearchSelector.click();
  }
}

async function validateSearchFilterResultPresent(page: Page, { groupLabel, linkLabel }: ExpectedSearchResultItem) {
  const { getDrawerMenuSearchResultGroupByText, getDrawerMenuSearchResultLinkByText } = getSelectors(page);
  await expect(getDrawerMenuSearchResultGroupByText(groupLabel)).toBeVisible();
  await expect(getDrawerMenuSearchResultLinkByText(linkLabel)).toBeVisible();
}

async function validateSearchFilterResultMissing(page: Page, { linkLabel }: ExpectedSearchResultItem) {
  const { getDrawerMenuSearchResultLinkByText } = getSelectors(page);
  await expect(getDrawerMenuSearchResultLinkByText(linkLabel)).not.toBeVisible();
}

function mapResultByName(result: Result): ExpectedSearchResultItem {
  return EXPECTED_RESULTS[result];
}

function getResultsToBeMissing({
  noResultsMode,
  expectedResults,
}: {
  noResultsMode: boolean;
  expectedResults: SearchMenuItemConfig['expectedResults'];
}): ExpectedSearchResultItem[] {
  if (noResultsMode) {
    return ALL_AVAILABLE_LINKS;
  }

  if (expectedResults.missing) {
    return expectedResults.missing.map(mapResultByName);
  }

  return Object.entries(EXPECTED_RESULTS).reduce((accArr: ExpectedSearchResultItem[], [resultName, resultItem]) => {
    if (!expectedResults.present.includes(resultName as Result)) {
      accArr.push(resultItem);
    }
    return accArr;
  }, []);
}

async function enterSearchQueryAndValidateResults(page: Page, { searchValue, expectedResults }: SearchMenuItemConfig) {
  const { selectors } = getSelectors(page);
  await selectors.drawerSearchInput.fill(searchValue);

  const noResultsMode = expectedResults.present.length < 1;

  const resultsToBePresent: ExpectedSearchResultItem[] = expectedResults.present.map(mapResultByName);
  const resultsToBeMissing = getResultsToBeMissing({ noResultsMode, expectedResults });

  if (noResultsMode) {
    await expect(selectors.drawerMenuNoFoundResults).toBeVisible();
  }

  for (const result of resultsToBePresent) {
    await validateSearchFilterResultPresent(page, result);
  }

  for (const result of resultsToBeMissing) {
    await validateSearchFilterResultMissing(page, result);
  }
}

async function validateInitialSearchState(page: Page) {
  const { selectors } = getSelectors(page);

  // Проверяем, что input пустой
  await expect(selectors.drawerSearchInput).toHaveValue('');

  for (const linkCard of ALL_AVAILABLE_LINKS) {
    await validateSearchFilterResultPresent(page, linkCard);
  }
}

async function clearSearchQuery(page: Page) {
  const { selectors } = getSelectors(page);

  await selectors.drawerSearchClearButton.click();
  await expect(selectors.drawerSearchClearButton).not.toBeVisible();
  await validateInitialSearchState(page);
}

async function validateFuzzyModeSelected(page: Page) {
  const { selectors } = getSelectors(page);
  await expect(selectors.drawerSearchSettingsFuzzyOption).toHaveAttribute('data-checked', 'true');
  await expect(selectors.drawerSearchSettingsPreciseOption).not.toHaveAttribute('data-checked', 'true');
}

async function validatePreciseModeSelected(page: Page) {
  const { selectors } = getSelectors(page);
  await expect(selectors.drawerSearchSettingsFuzzyOption).not.toHaveAttribute('data-checked', 'true');
  await expect(selectors.drawerSearchSettingsPreciseOption).toHaveAttribute('data-checked', 'true');
}

async function selectSearchMode(page: Page, mode: 'fuzzy' | 'precise', isMobile: EntityConfig['isMobile']) {
  const { selectors } = getSelectors(page);

  switch (mode) {
    case 'precise': {
      await validateFuzzyModeSelected(page);

      await selectors.drawerSearchSettingsPreciseOption.click();
      await validatePreciseModeSelected(page);

      break;
    }

    case 'fuzzy': {
      await validatePreciseModeSelected(page);

      await selectors.drawerSearchSettingsFuzzyOption.click();
      await validateFuzzyModeSelected(page);

      break;
    }

    default:
      break;
  }

  if (isMobile) {
    await page.waitForTimeout(1000);
  }
}

async function openSearchSettings(page: Page) {
  const { selectors } = getSelectors(page);

  await selectors.drawerSearchSettingsButton.click();
  await expect(selectors.drawerSearchSettingsFuzzyOption).toBeVisible();
  await expect(selectors.drawerSearchSettingsPreciseOption).toBeVisible();
}

async function validateQueries(page: Page, queries: string[], expectedResults: EntityConfig['expectedResults']) {
  let i = 0;

  for (const query of queries) {
    if (i > 0) {
      await clearSearchQuery(page);
    }

    await enterSearchQueryAndValidateResults(page, {
      searchValue: query,
      expectedResults,
    });

    i++;
  }
}

async function validateSearchFilterEntity(
  page: Page,
  { queries, expectedResults, openSearchSelector, isMobile }: EntityConfig,
) {
  await openMenuSearch(page, openSearchSelector);
  await validateInitialSearchState(page);

  await openSearchSettings(page);
  await selectSearchMode(page, 'precise', isMobile);
  await validateQueries(page, queries.precise, expectedResults);

  if (queries.fuzzy) {
    await clearSearchQuery(page);
    await validateQueries(page, queries.fuzzy, { present: [] }); // In precise mode we expect no results to be found in fuzzy mode

    if (isMobile) {
      await openSearchSettings(page);
    }
    await selectSearchMode(page, 'fuzzy', isMobile);

    const allQueries = [...queries.precise, ...queries.fuzzy];
    await clearSearchQuery(page);
    await validateQueries(page, allQueries, expectedResults);
  }
}

export function searchTests(options: SearchTestsOptions = {}) {
  test('drawer menu > search should work by group title', async ({ page }) => {
    await validateSearchFilterEntity(page, {
      ...options,
      queries: {
        precise: ['Разработка'],
        fuzzy: ['hfphf,jnrf', 'разботка'],
      },
      expectedResults: {
        present: [Result.ApiGateway, Result.ServerlessFunctions],
      },
    });
  });

  test('drawer menu > search should work by item title', async ({ page }) => {
    await validateSearchFilterEntity(page, {
      ...options,
      queries: {
        precise: ['vpc'],
        fuzzy: ['мзс', 'vipc'],
      },
      expectedResults: {
        present: [Result.Vpc],
      },
      openSearchSelector: options?.openSearchSelector,
    });
  });

  test('drawer menu > search should work by alias', async ({ page }) => {
    await validateSearchFilterEntity(page, {
      ...options,
      queries: {
        precise: ['ml finetuning'], // exception due to aliases being supported in fuzzy mode only
        fuzzy: ['lora', 'дщкф', 'lpra'],
      },
      expectedResults: {
        present: [Result.FineTuning],
      },
      openSearchSelector: options?.openSearchSelector,
    });
  });

  test('drawer menu > search should not show false positive results', async ({ page }) => {
    await validateSearchFilterEntity(page, {
      ...options,
      queries: {
        precise: ['asdfgb'],
      },
      expectedResults: {
        present: [],
      },
      openSearchSelector: options?.openSearchSelector,
    });
  });

  if (options?.isMobile) {
    test('drawer menu > search state and results should be reset once menu drawer is reopened', async ({ page }) => {
      const { selectors } = getSelectors(page);

      await validateSearchFilterEntity(page, {
        ...options,
        queries: { precise: ['вирт'] },
        expectedResults: {
          present: [Result.VirtualMachines],
          missing: [Result.Images],
        },
      });

      await selectors.drawerCloseButton.click();

      await openMenuSearch(page, options?.openSearchSelector);
      await validateInitialSearchState(page);
    });
  }
}
