import { Dispatch, SetStateAction } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { ChipToggle } from '@snack-uikit/chips';

import styles from './styles.module.scss';
import { SearchSettings } from './types';

type SearchSettingsChipsProps = {
  settings: SearchSettings;
  onSettingsChange: Dispatch<SetStateAction<SearchSettings>>;
};

export function SearchSettingsChips({ settings, onSettingsChange }: SearchSettingsChipsProps) {
  const { t } = useLocale('Header');

  const handlePrecisionChange = (precision: SearchSettings['precision']) => () => {
    onSettingsChange(prevSettings => ({
      ...prevSettings,
      precision,
    }));
  };

  return (
    <div className={styles.searchSettingsChips}>
      <ChipToggle
        label={t('searchSettingsFuzzyChipLabel')}
        checked={settings.precision === 'fuzzy'}
        onChange={handlePrecisionChange('fuzzy')}
        data-test-id='header__drawer-menu__search-option-fuzzy'
        size='xs'
      />
      <ChipToggle
        label={t('searchSettingsPreciseChipLabel')}
        checked={settings.precision === 'precise'}
        onChange={handlePrecisionChange('precise')}
        data-test-id='header__drawer-menu__search-option-precise'
        size='xs'
      />
    </div>
  );
}
