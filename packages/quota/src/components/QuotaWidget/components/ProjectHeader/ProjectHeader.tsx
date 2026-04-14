import { CloudFolderSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { TitleClickable } from '@cloud-ru/uikit-product-title-clickable';
import { ButtonOutline } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { QuotaWidgetPropsBase } from '../../../../types';
import styles from './styles.module.scss';

type ProjectHeaderProps = Pick<
  QuotaWidgetPropsBase,
  'projectName' | 'canEditQuota' | 'isError' | 'hideIncreaseQuotaButton' | 'onIncreaseQuotaClick'
> & {
  quotasUrl: string;
  onQuotasUrlClick?: () => void;
};

export function ProjectHeader({
  projectName,
  quotasUrl,
  canEditQuota,
  isError,
  onIncreaseQuotaClick,
  hideIncreaseQuotaButton,
  onQuotasUrlClick,
}: ProjectHeaderProps) {
  const { t } = useLocale('Quota');

  return (
    <div className={styles.header}>
      <div className={styles.projectWrapper}>
        <TitleClickable
          title={projectName}
          href={quotasUrl}
          target='_blank'
          icon={CloudFolderSVG}
          onClick={onQuotasUrlClick}
        />

        <Typography.SansBodyS className={styles.subtitle}>{t('widgetSubtitle')}</Typography.SansBodyS>
      </div>

      {canEditQuota && !isError && !hideIncreaseQuotaButton && (
        <ButtonOutline appearance='neutral' label={t('increaseQuota')} size='s' onClick={onIncreaseQuotaClick} />
      )}
    </div>
  );
}
