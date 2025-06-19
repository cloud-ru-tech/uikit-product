import { ConfigurationSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';

import { SearchSettingsHotSpot } from '../SearchSettingsHotSpot';
import styles from './styles.module.scss';

export type SearchSettingsButtonProps = {
  onClick(): void;
  showHotSpot?: boolean;
};

export function SearchSettingsButton({ onClick, showHotSpot = false }: SearchSettingsButtonProps) {
  return (
    <div className={styles.searchSettings}>
      <ButtonFunction
        icon={<ConfigurationSVG />}
        size='xs'
        className={styles.searchSettingsButton}
        onClick={onClick}
        data-test-id='header__drawer-menu__search-config-button'
      />

      {showHotSpot && (
        <div className={styles.searchSettingsHotSpotWrapper}>
          <SearchSettingsHotSpot />
        </div>
      )}
    </div>
  );
}
