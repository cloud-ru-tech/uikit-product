import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonTonal } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';
import { QuestionTooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../../../../../helpers';
import { FinanceInfoRowType } from '../../../../types';
import styles from './styles.module.scss';

export type FinanceInfoRowProps = FinanceInfoRowType & {
  actionButtonText: string;
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
}: FinanceInfoRowProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

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
      <div className={styles.rightAlign}>
        <ButtonTonal size='xs' label={actionButtonText} icon={<PlusSVG />} onClick={onAddClick} />
      </div>
      {description && (
        <Typography.SansBodyS tag='div' className={styles.description}>
          {description}
        </Typography.SansBodyS>
      )}
    </>
  );
}
