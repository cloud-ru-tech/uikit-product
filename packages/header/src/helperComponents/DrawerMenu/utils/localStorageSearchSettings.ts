import { SearchSettings } from '../components/SearchSettingsChips';
import { SEARCH_PRECISION } from '../components/SearchSettingsChips/constants';

const INITIAL_SEARCH_SETTINGS: SearchSettings = {
  precision: 'fuzzy',
};

const HEADER_SETTINGS_LS_KEY = 'header_search_settings';

const isSearchSettings = (value: unknown): value is SearchSettings => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return (
    'precision' in value &&
    typeof value.precision === 'string' &&
    Object.values(SEARCH_PRECISION).includes(value.precision as SearchSettings['precision'])
  );
};

export function getSearchSettingsFromLocalStorage(): SearchSettings {
  const stringifiedValue = localStorage.getItem(HEADER_SETTINGS_LS_KEY);
  if (!stringifiedValue) {
    return INITIAL_SEARCH_SETTINGS;
  }

  try {
    const parsedValue = JSON.parse(stringifiedValue);
    if (isSearchSettings(parsedValue)) {
      return parsedValue;
    }
    return INITIAL_SEARCH_SETTINGS;
  } catch {
    return INITIAL_SEARCH_SETTINGS;
  }
}

export function saveSearchSettingsToLocalStorage(settings: SearchSettings): void {
  localStorage.setItem(HEADER_SETTINGS_LS_KEY, JSON.stringify(settings));
}
