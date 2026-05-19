import { ConfigurationSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';

import styles from './styles.module.scss';

export type SearchSettingsButtonProps = {
  onClick(): void;
};

export function SearchSettingsButton({ onClick }: SearchSettingsButtonProps) {
  return (
    <div className={styles.searchSettings}>
      <ButtonFunction
        icon={<ConfigurationSVG />}
        size='xs'
        className={styles.searchSettingsButton}
        onClick={onClick}
        data-test-id='header__drawer-menu__search-config-button'
      />
    </div>
  );
}
