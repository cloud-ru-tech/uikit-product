import { formatNumber } from '@sbercloud/ft-formatters';
import { CostControlSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { HotSpot } from '@snack-uikit/hot-spot';
import { Spinner } from '@snack-uikit/loaders';

import { textProvider, Texts } from '../../../../helpers';
import { CURRENCY_MAP } from '../../constants';
import styles from './styles.module.scss';

export type ButtonFinancialProps = {
  value: number;
  type?: 'balance' | 'bonuses';
  hotSpot?: boolean;
  status?: 'default' | 'attention';
  valueVisible?: boolean;
  isLoading?: boolean;
  onClick?(): void;
};

export function ButtonFinancial({
  value,
  type = 'balance',
  hotSpot = false,
  status = 'default',
  valueVisible,
  isLoading,
  onClick,
}: ButtonFinancialProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <HotSpot enabled={hotSpot} appearance={status === 'attention' ? 'red' : 'primary'} offsetY={4} offsetX={-4}>
      <button
        data-test-id='header__financial-menu__button'
        className={styles.button}
        data-status={status}
        type='button'
        onClick={onClick}
      >
        {isLoading && <Spinner size='xs' />}

        {valueVisible && (
          <>
            <div className={styles.label}>{formatNumber(value, { type: formatNumber.types.DigitSpaces })}</div>

            <div>
              {type === 'bonuses' ? textProvider(languageCode, Texts.FinancialMenuBonusSign) : CURRENCY_MAP.ruble}
            </div>
          </>
        )}

        <CostControlSVG />
      </button>
    </HotSpot>
  );
}
