import { ReactNode } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { AdaptiveTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';
import { ButtonTonal } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';
import { QuestionTooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { FinanceInfoRowType } from '../../../../types';
import styles from './styles.module.scss';

export type FinanceInfoRowProps = Omit<FinanceInfoRowType, 'visible'> & {
  actionButtonText: string;
  buttonTip?: ReactNode;
  isMobile?: boolean;
};

export function FinanceInfoRow({
  label,
  description,
  tip,
  tipMoreButtonLink,
  onOpenChange,
  value,
  actionButtonText,
  onAddClick,
  status = 'default',
  isButtonDisabled,
  buttonTip,
  isMobile,
}: FinanceInfoRowProps) {
  const { t } = useLocale('Header');

  const plusButton = (
    <ButtonTonal
      size='xs'
      label={isMobile ? undefined : actionButtonText}
      icon={<PlusSVG />}
      onClick={onAddClick}
      disabled={isButtonDisabled}
    />
  );

  return (
    <>
      <div className={styles.titleWrapper}>
        <Typography.SansLabelL>{label}</Typography.SansLabelL>
        {tip && (
          <QuestionTooltip
            tip={
              <>
                {tip}
                {tipMoreButtonLink && (
                  <div className={styles.tipMoreButtonLink}>
                    <Link
                      href={tipMoreButtonLink}
                      text={t('financialMenuTooltipMoreButton')}
                      appearance='primary'
                      textMode='on-accent'
                    />
                  </div>
                )}
              </>
            }
            placement='top'
            onOpenChange={onOpenChange}
          />
        )}
      </div>
      <div className={styles.rightAlign}>
        <Typography.SansLabelL tag='div' className={styles.content} data-status={status}>
          {value}
        </Typography.SansLabelL>
      </div>

      <div className={styles.rightAlign}>
        {isButtonDisabled ? (
          <AdaptiveTooltip
            layoutType={isMobile ? LAYOUT_TYPE.Mobile : LAYOUT_TYPE.Desktop}
            className={styles.negativeBalanceTooltip}
            tip={buttonTip}
            placement={'left'}
          >
            {plusButton}
          </AdaptiveTooltip>
        ) : (
          plusButton
        )}
      </div>

      {description && (
        <Typography.SansBodyS tag='div' className={styles.description}>
          {description}
        </Typography.SansBodyS>
      )}
    </>
  );
}
