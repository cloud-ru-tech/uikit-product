import { ReactNode } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { MobileTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonTonal } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';
import { QuestionTooltip, Tooltip, TooltipProps } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../../../../../helpers';
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
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const renderButton = () => (
    <ButtonTonal
      size='xs'
      label={isMobile ? undefined : actionButtonText}
      icon={<PlusSVG />}
      onClick={onAddClick}
      disabled={isButtonDisabled}
    />
  );

  function AdaptiveTooltip() {
    const props: TooltipProps = {
      className: styles.negativeBalanceTooltip,
      tip: buttonTip,
      placement: 'left',
      children: renderButton(),
    };

    return isMobile ? <MobileTooltip {...props} /> : <Tooltip {...props} />;
  }

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
                      text={textProvider(languageCode, Texts.FinancialMenuTooltipMoreButton)}
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

      <div className={styles.rightAlign}>{isButtonDisabled ? AdaptiveTooltip() : renderButton()}</div>

      {description && (
        <Typography.SansBodyS tag='div' className={styles.description}>
          {description}
        </Typography.SansBodyS>
      )}
    </>
  );
}
