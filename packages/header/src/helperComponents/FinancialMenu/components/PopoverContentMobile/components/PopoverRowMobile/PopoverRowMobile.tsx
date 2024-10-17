import { ReactNode } from 'react';

import { ArrowLinksSVG, PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction, ButtonTonal } from '@snack-uikit/button';
import { QuestionTooltip } from '@snack-uikit/tooltip';

import { textProvider, Texts } from '../../../../../../helpers';
import styles from './styles.module.scss';

export type PopoverRowMobileProps = {
  label: string;
  description?: string;
  tip?: ReactNode;
  tipMoreButtonLink?: string;
  onOpenChange?(isOpen: boolean): void;
  value: string;
  onAddClick(): void;
  status?: 'default' | 'attention';
};

export function PopoverRowMobile({
  label,
  description,
  tip,
  tipMoreButtonLink,
  onOpenChange,
  value,
  onAddClick,
  status = 'default',
}: PopoverRowMobileProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <div className={styles.rowWrapper}>
      <div className={styles.row}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>{label}</span>
          {tip && (
            <QuestionTooltip
              tip={
                <>
                  {tip}
                  {tipMoreButtonLink && (
                    <div className={styles.tipMoreButtonLink}>
                      <ButtonFunction
                        size='xs'
                        appearance='primary'
                        href={tipMoreButtonLink}
                        label={textProvider(languageCode, Texts.FinancialMenuTooltipMoreButton)}
                        icon={<ArrowLinksSVG size={16} />}
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

        <div className={styles.contentWrapper}>
          <span className={styles.content} data-status={status}>
            {value}
          </span>

          <ButtonTonal size='xs' icon={<PlusSVG />} appearance='primary' onClick={onAddClick} />
        </div>
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}
