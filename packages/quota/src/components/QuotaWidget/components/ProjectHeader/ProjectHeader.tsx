import { QuotaSVG } from '@cloud-ru/uikit-product-icons';
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

const RUSSIAN_CHARS_REGEXP = /[А-Яа-яЁё]/;

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

  const widgetTitle = RUSSIAN_CHARS_REGEXP.test(projectName) ? 'widgetTitle.quotes' : 'widgetTitle.noQuotes';

  return (
    <div className={styles.header}>
      <div className={styles.projectWrapper}>
        <TitleClickable
          title={t(widgetTitle, { project: projectName })}
          href={quotasUrl}
          target='_blank'
          icon={QuotaSVG}
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
