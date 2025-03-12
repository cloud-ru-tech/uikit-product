import cn from 'classnames';
import { Fragment, MouseEventHandler } from 'react';

import { formatNumber } from '@sbercloud/ft-formatters';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { Divider } from '@snack-uikit/divider';
import { Link } from '@snack-uikit/link';
import { SkeletonText } from '@snack-uikit/skeleton';
import { Typography } from '@snack-uikit/typography';

import { PopoverContentProps } from '../../types';
import { EyeButton } from '../EyeButton';
import { StarterGrant } from '../StarterGrant';
import { FinanceInfoRow } from './components';
import { Grant } from './components/Grant';
import styles from './styles.module.scss';

export function PopoverContent({
  loading = false,
  onClose,
  link,
  bonuses,
  balance,
  eyeButton,
  bonusGrants = [],
  starterGrant,
  agreement,
  isMobile,
}: PopoverContentProps) {
  const { t } = useLocale('Header');

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = event => {
    link?.onClick?.(event);
    onClose();
  };

  const handleGetStarterGrantClick = () => {
    starterGrant?.onGetGrantClick?.();
    onClose();
  };

  const balanceValue = formatNumber(balance.value, { type: formatNumber.types.Currency });
  const balanceActionButtonText = t('financialMenuBalanceAction');

  const bonusGrantValue: string = formatNumber(bonuses.value, {
    type: formatNumber.types.DigitSpaces,
    unit: t('financialMenuBonusSign'),
  });
  let bonusGrantsDesc = bonuses.description || t('financialMenuNoGrants');

  if (bonusGrants.length !== 0) {
    bonusGrantsDesc = '';
  }
  const bonusGrantActionButtonText = t('financialMenuBonusesAction');
  const toSectionLink = agreement || t('financialMenuToSection');

  return (
    <SkeletonText lines={6} loading={loading}>
      <div className={styles.header}>
        {isMobile ? (
          <div className={styles.titleLine}>
            <Link
              {...link}
              onClick={handleLinkClick}
              text={toSectionLink}
              textMode='accent'
              appearance='primary'
              truncateVariant='end'
              className={styles.agreementLink}
            />

            <EyeButton {...eyeButton} />
          </div>
        ) : (
          <>
            <div className={styles.titleLine}>
              <Typography.SansBodyL>{t('financialMenuTitle')}</Typography.SansBodyL>

              <EyeButton {...eyeButton} />
            </div>

            <div className={styles.titleLine}>
              <Link {...link} onClick={handleLinkClick} text={toSectionLink} textMode='accent' appearance='primary' />
            </div>
          </>
        )}
      </div>

      <div className={styles.content}>
        {balance.visible && (
          <>
            <FinanceInfoRow
              {...balance}
              value={balanceValue}
              actionButtonText={balanceActionButtonText}
              isMobile={isMobile}
            />

            <Divider
              className={cn({
                [styles.divider]: isMobile,
                [styles.wideDivider]: !isMobile,
              })}
            />
          </>
        )}

        <FinanceInfoRow
          {...bonuses}
          value={bonusGrantValue}
          actionButtonText={bonusGrantActionButtonText}
          description={bonusGrantsDesc}
          buttonTip={t('financialMenuBonusesDisabledTip')}
          isMobile={isMobile}
        />

        {bonusGrants.map(grant => (
          <Fragment key={grant.id}>
            <Divider className={styles.divider} />
            <Grant {...grant} isMobile={isMobile} />
          </Fragment>
        ))}

        {(starterGrant?.isAvailable || starterGrant?.inProcess) && (
          <>
            <Divider className={styles.divider} />
            <StarterGrant {...starterGrant} onGetGrantClick={handleGetStarterGrantClick} isMobile={isMobile} />
          </>
        )}
      </div>
    </SkeletonText>
  );
}
