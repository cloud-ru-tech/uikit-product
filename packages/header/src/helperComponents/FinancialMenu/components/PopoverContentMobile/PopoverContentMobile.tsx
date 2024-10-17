import { MouseEventHandler } from 'react';

import { formatNumber } from '@sbercloud/ft-formatters';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Link } from '@snack-uikit/link';
import { PromoTag } from '@snack-uikit/promo-tag';
import { SkeletonText } from '@snack-uikit/skeleton';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../../../helpers';
import { PopoverContentProps } from '../../types';
import { EyeButton } from '../EyeButton';
import { PopoverRowMobile } from './components/PopoverRowMobile';
import styles from './styles.module.scss';

export function PopoverContentMobile({
  loading = false,
  onClose,
  tag,
  link,
  agreement,
  bonuses,
  balance,
  eyeButton,
}: PopoverContentProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = event => {
    link?.onClick?.(event);
    onClose();
  };

  const balanceValue = formatNumber(balance.value, { type: formatNumber.types.Currency });
  const bonusGrantValue: string = formatNumber(bonuses.value, {
    type: formatNumber.types.DigitSpaces,
    unit: textProvider(languageCode, Texts.FinancialMenuBonusSign),
  });

  return (
    <div className={styles.content}>
      <SkeletonText lines={6} loading={loading}>
        <div className={styles.header}>
          {tag && <PromoTag {...tag} />}

          <div className={styles.title}>
            <div className={styles.linkWrapper}>
              <Link
                size='m'
                appearance='primary'
                textMode='accent'
                text={textProvider(languageCode, Texts.FinancialMenuTitle)}
                {...link}
                onClick={handleLinkClick}
              />
            </div>

            <EyeButton {...eyeButton} />
          </div>

          {agreement && (
            <span className={styles.agreement}>
              <TruncateString text={agreement} />
            </span>
          )}
        </div>

        <PopoverRowMobile {...balance} label={balance.label} value={balanceValue} />
        <PopoverRowMobile {...bonuses} label={bonuses.label} value={bonusGrantValue} />
      </SkeletonText>
    </div>
  );
}
