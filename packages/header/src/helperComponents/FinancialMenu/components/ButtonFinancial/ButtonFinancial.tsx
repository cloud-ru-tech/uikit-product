import { formatNumber } from '@sbercloud/ft-formatters';
import { RubleSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { HotSpot, HotSpotProps } from '@snack-uikit/hot-spot';

import { textProvider, Texts } from '../../../../helpers';
import { CURRENCY_MAP } from '../../constants';
import styles from './styles.module.scss';

export type ButtonFinancialProps = {
  value: number;
  type?: 'balance' | 'bonuses';
  hotSpot?: HotSpotProps['appearance'];
  status?: 'default' | 'attention';
  valueVisible?: boolean;
  onClick?(): void;
};

export function ButtonFinancial({
  value,
  type = 'balance',
  hotSpot,
  status = 'default',
  valueVisible,
  onClick,
}: ButtonFinancialProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <HotSpot enabled={Boolean(hotSpot)} appearance={hotSpot} offsetY={4} offsetX={-4}>
      <button
        data-test-id='header__financial-menu__button'
        className={styles.button}
        data-status={status}
        type='button'
        onClick={onClick}
      >
        {valueVisible && (
          <>
            <div className={styles.label}>{formatNumber(value, { type: formatNumber.types.DigitSpaces })}</div>

            <div>
              {type === 'bonuses' ? textProvider(languageCode, Texts.FinancialMenuBonusSign) : CURRENCY_MAP.ruble}
            </div>
          </>
        )}

        <RubleSVG />
      </button>
    </HotSpot>
  );
}
