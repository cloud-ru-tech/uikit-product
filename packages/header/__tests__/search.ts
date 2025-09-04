import { test } from 'testcafe';

import { getDrawerMenuSearchResultGroupByText, getDrawerMenuSearchResultLinkByText, selectors } from './selectors';

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
  openSearchSelector?: Selector;
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

async function openMenuSearch(t: TestController, openSearchSelector?: Selector) {
  const { drawerMenuButton } = selectors;

  await t.click(drawerMenuButton);

  if (openSearchSelector) {
    await t.click(openSearchSelector);
  }
}

async function validateSearchFilterResultPresent(
  t: TestController,
  { groupLabel, linkLabel }: ExpectedSearchResultItem,
) {
  await t.expect(getDrawerMenuSearchResultGroupByText(groupLabel).exists).ok(`Group label ${groupLabel} is missing`);
  await t.expect(getDrawerMenuSearchResultLinkByText(linkLabel).exists).ok(`Card link ${linkLabel} is missing`);
}

async function validateSearchFilterResultMissing(t: TestController, { linkLabel }: ExpectedSearchResultItem) {
  await t
    .expect(getDrawerMenuSearchResultLinkByText(linkLabel).exists)
    .notOk(`Card link ${linkLabel} should be missing`);
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

async function enterSearchQueryAndValidateResults(
  t: TestController,
  { searchValue, expectedResults }: SearchMenuItemConfig,
) {
  const { drawerSearchInput, drawerMenuNoFoundResults } = selectors;
  await t.typeText(drawerSearchInput, searchValue);

  const noResultsMode = expectedResults.present.length < 1;

  const resultsToBePresent: ExpectedSearchResultItem[] = expectedResults.present.map(mapResultByName);
  const resultsToBeMissing = getResultsToBeMissing({ noResultsMode, expectedResults });

  if (noResultsMode) {
    await t.expect(drawerMenuNoFoundResults.exists).ok('No data result is missing');
  }

  for (const result of resultsToBePresent) {
    await validateSearchFilterResultPresent(t, result);
  }

  for (const result of resultsToBeMissing) {
    await validateSearchFilterResultMissing(t, result);
  }
}

async function validateInitialSearchState(t: TestController) {
  const { drawerSearchInput } = selectors;

  await t.expect(drawerSearchInput.textContent).eql('');

  for (const linkCard of ALL_AVAILABLE_LINKS) {
    await validateSearchFilterResultPresent(t, linkCard);
  }
}

async function clearSearchQuery(t: TestController) {
  const { drawerSearchClearButton } = selectors;

  await t.click(drawerSearchClearButton);
  await t
    .expect(drawerSearchClearButton.exists)
    .notOk('Clear button is present, but must disappear after clearing input');
  await validateInitialSearchState(t);
}

async function validateFuzzyModeSelected(t: TestController) {
  const { drawerSearchSettingsFuzzyOption, drawerSearchSettingsPreciseOption } = selectors;
  await t.expect(drawerSearchSettingsFuzzyOption.getAttribute('data-checked')).eql('true');
  await t.expect(drawerSearchSettingsPreciseOption.getAttribute('data-checked')).eql(null);
}

async function validatePreciseModeSelected(t: TestController) {
  const { drawerSearchSettingsFuzzyOption, drawerSearchSettingsPreciseOption } = selectors;
  await t.expect(drawerSearchSettingsFuzzyOption.getAttribute('data-checked')).eql(null);
  await t.expect(drawerSearchSettingsPreciseOption.getAttribute('data-checked')).eql('true');
}

async function selectSearchMode(t: TestController, mode: 'fuzzy' | 'precise', isMobile: EntityConfig['isMobile']) {
  const { drawerSearchSettingsFuzzyOption, drawerSearchSettingsPreciseOption } = selectors;

  switch (mode) {
    case 'precise': {
      await validateFuzzyModeSelected(t);

      await t.click(drawerSearchSettingsPreciseOption);
      await validatePreciseModeSelected(t);

      break;
    }

    case 'fuzzy': {
      await validatePreciseModeSelected(t);

      await t.click(drawerSearchSettingsFuzzyOption);
      await validateFuzzyModeSelected(t);

      break;
    }

    default:
      break;
  }

  if (isMobile) {
    await t.wait(1000);
  }
}

async function openSearchSettings(t: TestController) {
  const { drawerSearchSettingsButton, drawerSearchSettingsFuzzyOption, drawerSearchSettingsPreciseOption } = selectors;

  await t.click(drawerSearchSettingsButton);
  await t.expect(drawerSearchSettingsFuzzyOption.exists).ok('Search setting fuzzy mode is missing');
  await t.expect(drawerSearchSettingsPreciseOption.exists).ok('Search setting precise mode is missing');
}

async function validateQueries(t: TestController, queries: string[], expectedResults: EntityConfig['expectedResults']) {
  let i = 0;

  for (const query of queries) {
    if (i > 0) {
      await clearSearchQuery(t);
    }

    await enterSearchQueryAndValidateResults(t, {
      searchValue: query,
      expectedResults,
    });

    i++;
  }
}

async function validateSearchFilterEntity(
  t: TestController,
  { queries, expectedResults, openSearchSelector, isMobile }: EntityConfig,
) {
  await openMenuSearch(t, openSearchSelector);
  await validateInitialSearchState(t);

  await openSearchSettings(t);
  await selectSearchMode(t, 'precise', isMobile);
  await validateQueries(t, queries.precise, expectedResults);

  if (queries.fuzzy) {
    await clearSearchQuery(t);
    await validateQueries(t, queries.fuzzy, { present: [] }); // In precise mode we expect no results to be found in fuzzy mode

    if (isMobile) {
      await openSearchSettings(t);
    }
    await selectSearchMode(t, 'fuzzy', isMobile);

    const allQueries = [...queries.precise, ...queries.fuzzy];
    await clearSearchQuery(t);
    await validateQueries(t, allQueries, expectedResults);
  }
}

export function searchTests(options: SearchTestsOptions = {}) {
  test('drawer menu > search should work by group title', async t => {
    await validateSearchFilterEntity(t, {
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

  test('drawer menu > search should work by item title', async t => {
    await validateSearchFilterEntity(t, {
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

  test('drawer menu > search should work by alias', async t => {
    await validateSearchFilterEntity(t, {
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

  test('drawer menu > search should not show false positive results', async t => {
    await validateSearchFilterEntity(t, {
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
    test('drawer menu > search state and results should be reset once menu drawer is reopened', async t => {
      const { drawerCloseButton } = selectors;

      await validateSearchFilterEntity(t, {
        ...options,
        queries: { precise: ['вирт'] },
        expectedResults: {
          present: [Result.VirtualMachines],
          missing: [Result.Images],
        },
      });

      await t.click(drawerCloseButton);

      await openMenuSearch(t, options?.openSearchSelector);
      await validateInitialSearchState(t);
    });
  }
}
