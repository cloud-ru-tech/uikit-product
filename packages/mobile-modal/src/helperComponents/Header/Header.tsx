import cn from 'classnames';
import { ReactNode } from 'react';

import { QuestionTooltip, QuestionTooltipProps } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTENT_ALIGN, TEST_IDS } from '../../constants';
import { ContentAlign } from '../../types';
import styles from './styles.module.scss';

export type ModalHeaderProps = WithSupportProps<{
  /** Заголовок модального окна */
  title: ReactNode;
  /** Тултип для заголовка */
  titleTooltip?: QuestionTooltipProps['tip'];
  /** Подзаголовок */
  subtitle?: ReactNode;
  /** Выравнивание контента */
  align?: ContentAlign;
  className?: string;
}>;

export function ModalHeader({
  title,
  titleTooltip,
  subtitle,
  align = CONTENT_ALIGN.Default,
  className,
  ...rest
}: ModalHeaderProps) {
  return (
    <div className={cn(styles.header, className)} {...extractSupportProps(rest)} data-test-id={TEST_IDS.header}>
      <div className={styles.headlineLayout} data-align={align}>
        <div className={styles.headline}>
          <Typography.SansHeadlineS className={styles.title} data-test-id={TEST_IDS.title}>
            {title}
          </Typography.SansHeadlineS>

          {titleTooltip && <QuestionTooltip tip={titleTooltip} size='s' data-test-id={TEST_IDS.tooltip} />}
        </div>

        {subtitle && (
          <Typography.SansBodyM className={styles.subtitle} data-test-id={TEST_IDS.subtitle}>
            {subtitle}
          </Typography.SansBodyM>
        )}
      </div>
    </div>
  );
}
