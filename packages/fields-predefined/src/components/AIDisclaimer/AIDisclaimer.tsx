import { MouseEvent } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { AdaptiveQuestionTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Link } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type AIDisclaimerProps = WithLayoutType<{
  /** Ссылка на чат поддержки */
  supportUrl?: string;
  /** Действие при клике по ссылке на чат поддержки */
  onSupportLinkClick?(e: MouseEvent): void;
}>;

export function AIDisclaimer({ layoutType, supportUrl, onSupportLinkClick }: AIDisclaimerProps) {
  const { t } = useLocale('FieldsPredefined');

  return (
    <div className={styles.disclaimer}>
      <span className={styles.hintText} data-layout-type={layoutType}>
        {t('FieldAi.hint.text')}
      </span>

      {supportUrl && (
        <AdaptiveQuestionTooltip
          layoutType={layoutType}
          size='xs'
          tooltipClassname={styles.tooltip}
          tip={
            <>
              <Typography.SansBodyS>{t('FieldAi.hint.tooltip')}</Typography.SansBodyS>
              <Link
                text={t('FieldAi.hint.tooltipLink')}
                href={supportUrl}
                onClick={onSupportLinkClick}
                appearance='invert-neutral'
                textMode='accent'
              />
            </>
          }
        />
      )}
    </div>
  );
}
