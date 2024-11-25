import { useLanguage } from '@sbercloud/uikit-product-utils';
import { PromoTag, PromoTagProps } from '@snack-uikit/promo-tag';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../../../helpers';
import { PeriodDropdown, PeriodDropdownProps } from '../PeriodDropdown';
import styles from './styles.module.scss';

export type HeaderBlockProps = PeriodDropdownProps & {
  promoBadge?: Pick<PromoTagProps, 'text' | 'appearance'> | string;
};

export function HeaderBlock({ period, onPeriodChanged, periodOptions, promoBadge }: HeaderBlockProps) {
  const { languageCode } = useLanguage();

  return (
    <>
      {promoBadge && (
        <div className={styles.promoBadge}>
          <PromoTag {...(typeof promoBadge === 'string' ? { text: promoBadge } : promoBadge)} />
        </div>
      )}

      <div className={styles.headline}>
        <PeriodDropdown period={period} onPeriodChanged={onPeriodChanged} periodOptions={periodOptions} />

        <Typography.SansBodyM className={styles.vat}>{textProvider(languageCode, Texts.Vat)}</Typography.SansBodyM>
      </div>
    </>
  );
}
