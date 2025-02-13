import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { Typography } from '@snack-uikit/typography';
import { excludeSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { parseKeyToDataTest } from '../../../utils';
import styles from './styles.module.scss';

export type ProductCardHeaderProps = WithSupportProps<{
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  description?: ReactNode;
  /** Метаинформация */
  metadata?: string;
  icon?: IconPredefinedProps['icon'];
  /** CSS-класс для элемента с контентом */
  className?: string;
}>;

export function PrivateCardHeader({
  title,
  description,
  metadata,
  icon,
  className,

  ...rest
}: ProductCardHeaderProps) {
  return (
    <div className={cn(styles.titleLayout, className)} {...excludeSupportProps(rest)}>
      {icon && <IconPredefined icon={icon} size='s' decor={false} appearance='neutral' shape='square' />}

      <div className={styles.contentLayout}>
        <Typography
          family='sans'
          size='s'
          purpose='title'
          className={styles.title}
          data-test-id={parseKeyToDataTest('catalog-card', 'title')}
        >
          {title}
        </Typography>

        {metadata && <Typography.SansBodyS className={styles.metadata}>{metadata}</Typography.SansBodyS>}

        {description && (
          <Typography
            family='sans'
            size='m'
            purpose='body'
            className={styles.description}
            data-test-id={parseKeyToDataTest('catalog-card', 'desc')}
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
}
