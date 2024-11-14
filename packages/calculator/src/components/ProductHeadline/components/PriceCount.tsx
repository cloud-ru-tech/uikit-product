import { Divider } from '@snack-uikit/divider';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { Price, PRICE_PERIOD, PricePeriod } from '../../../types';
import { formatNumber, getPrice } from '../../../utils';
import styles from './styles.module.scss';

const PRICE_NAME: Record<PricePeriod, string> = {
  [PRICE_PERIOD.Month]: 'В месяц',
  [PRICE_PERIOD.Day]: 'В день',
  [PRICE_PERIOD.Hour]: 'В час',
};

type PriceCountProps = {
  price?: Price;
  pricePeriod: PricePeriod;
  partners?: boolean;
  freeTier?: boolean;
  mobile?: boolean;
  hasCounter?: boolean;
};

export function BasePriceCount({ price, pricePeriod, freeTier, mobile }: PriceCountProps) {
  const total = getPrice({ price, pricePeriod });

  if (freeTier && !total)
    return (
      <div className={styles.price} data-mobile={mobile || undefined}>
        Бесплатно
        <br />
        навсегда
      </div>
    );

  return (
    <div className={styles.price} data-mobile={mobile || undefined}>
      <div className={styles.total}>
        <Typography.SansTitleM>
          <TruncateString text={formatNumber(total)} maxLines={1} />
        </Typography.SansTitleM>
        <Typography.SansBodyL>₽</Typography.SansBodyL>
      </div>
      <div className={styles.caption}>{`${PRICE_NAME[pricePeriod]} c НДС`}</div>
    </div>
  );
}

export function PartnersPriceCount({ price, pricePeriod, mobile, hasCounter }: PriceCountProps) {
  const total = getPrice({ price, pricePeriod });
  const partnersTotal = getPrice({ price, pricePeriod, partners: true });
  const mobileWithCounter = mobile && hasCounter;

  const partnersSale = `-${100 - Math.trunc((partnersTotal / total) * 100 + 0.1)}%`;

  return (
    <div className={styles.partnersWrapper} data-mobile-with-counter={mobileWithCounter || undefined}>
      <div className={styles.price} data-mobile={mobile || undefined}>
        <div className={styles.caption}>Рыночная цена</div>
        <div className={styles.total}>
          <Typography.SansTitleM>
            <TruncateString text={formatNumber(total)} maxLines={1} />
          </Typography.SansTitleM>
          <Typography.SansBodyL>₽</Typography.SansBodyL>
        </div>
      </div>

      <Divider orientation={mobileWithCounter ? 'horizontal' : 'vertical'} className={styles.divider} />

      <div className={styles.price} data-mobile={mobile || undefined}>
        <div className={styles.caption}>
          Партнерская цена {total > 0 && <span className={styles.sale}>{partnersSale}</span>}
        </div>
        <div className={styles.total}>
          <Typography.SansTitleM>
            <TruncateString text={formatNumber(partnersTotal)} maxLines={1} />
          </Typography.SansTitleM>
          <Typography.SansBodyL>₽</Typography.SansBodyL>
        </div>
      </div>
    </div>
  );
}

export function PriceCount({ partners, ...props }: PriceCountProps) {
  return partners ? <PartnersPriceCount {...props} /> : <BasePriceCount {...props} />;
}
