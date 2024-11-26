import { Fragment, MouseEventHandler } from 'react';

import { formatNumber } from '@sbercloud/ft-formatters';
import { CostControlSVG, PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { Link } from '@snack-uikit/link';
import { SkeletonText } from '@snack-uikit/skeleton';
import { Tag } from '@snack-uikit/tag';

import { textProvider, Texts } from '../../../../helpers';
import { PopoverContentProps } from '../../types';
import { EyeButton } from '../EyeButton';
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
}: PopoverContentProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = event => {
    link?.onClick?.(event);
    onClose();
  };

  const handleGetStarterGrantClick = () => {
    starterGrant?.onGetGrantClick?.();
    onClose();
  };

  const balanceValue = formatNumber(balance.value, { type: formatNumber.types.Currency });
  const balanceActionButtonText = textProvider(languageCode, Texts.FinancialMenuBalanceAction);

  const bonusGrantValue: string = formatNumber(bonuses.value, {
    type: formatNumber.types.DigitSpaces,
    unit: textProvider(languageCode, Texts.FinancialMenuBonusSign),
  });
  let bonusGrantsDesc = bonuses.description || textProvider(languageCode, Texts.FinancialMenuNoGrants);

  if (bonusGrants.length !== 0) {
    bonusGrantsDesc = '';
  }
  const bonusGrantActionButtonText = textProvider(languageCode, Texts.FinancialMenuBonusesAction);

  const titleText = `${textProvider(languageCode, Texts.FinancialMenuTitle)} ❯`;

  return (
    <div className={styles.contentWrapper}>
      <SkeletonText lines={6} loading={loading}>
        <div className={styles.header}>
          <div className={styles.titleLine}>
            <div className={styles.titleLeft}>
              <CostControlSVG />

              <Link {...link} onClick={handleLinkClick} text={titleText} size='l' appearance='neutral' />
            </div>

            <EyeButton {...eyeButton} />
          </div>
        </div>

        <div className={styles.content}>
          <FinanceInfoRow {...balance} value={balanceValue} actionButtonText={balanceActionButtonText} />

          <Divider className={styles.divider} />

          <FinanceInfoRow
            {...bonuses}
            value={bonusGrantValue}
            actionButtonText={bonusGrantActionButtonText}
            description={bonusGrantsDesc}
          />

          {bonusGrants.map(grant => (
            <Fragment key={grant.id}>
              <Divider className={styles.grantDivider} />
              <Grant {...grant} />
            </Fragment>
          ))}

          {(starterGrant?.isAvailable || starterGrant?.inProcess) && (
            <>
              <Divider className={styles.grantDivider} />

              <div className={styles.starterGrant}>
                <span className={styles.starterGrantName}>
                  {textProvider(languageCode, Texts.FinancialMenuStarterGrantName)}
                </span>

                {starterGrant?.isAvailable && (
                  <ButtonFunction
                    size='xs'
                    appearance='primary'
                    label={textProvider(languageCode, Texts.FinancialMenuGetGrant)}
                    icon={<PlusSVG />}
                    onClick={handleGetStarterGrantClick}
                  />
                )}

                {starterGrant?.inProcess && (
                  <Tag
                    size='xs'
                    appearance='blue'
                    label={textProvider(languageCode, Texts.FinancialMenuGrantIsOnTheWay)}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </SkeletonText>
    </div>
  );
}
