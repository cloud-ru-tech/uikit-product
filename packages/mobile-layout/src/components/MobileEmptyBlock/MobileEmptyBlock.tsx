import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Footer, FooterProps } from './components';
import styles from './styles.module.scss';

export type MobileEmptyBlockProps = WithSupportProps<{
  /** Заголовок */
  title?: string;
  /** Подзаголовок */
  description?: ReactNode;
  /** Иконка */
  icon?: Pick<IconPredefinedProps, 'icon' | 'decor' | 'appearance'>;

  className?: string;
}> &
  (Pick<FooterProps, 'primaryButton' | 'secondaryButton'> | { primaryButton?: never; secondaryButton?: never });

export function MobileEmptyBlock({
  primaryButton,
  secondaryButton,
  className,
  title,
  description,
  icon,
  ...rest
}: MobileEmptyBlockProps) {
  return (
    <div className={cn(styles.emptyBlock, className)} {...extractSupportProps(rest)}>
      <div className={cn(styles.infoBlock, className)} {...extractSupportProps(rest)}>
        {icon && (
          <IconPredefined
            icon={icon.icon}
            appearance={icon.appearance ?? 'primary'}
            decor={icon.decor ?? true}
            size='m'
          />
        )}

        <div className={styles.contentLayout}>
          <div className={styles.textWrap}>
            {title && (
              <Typography family='sans' purpose='title' size='m' className={styles.title}>
                {title}
              </Typography>
            )}

            {description && (
              <Typography family='sans' purpose='body' size='m' className={styles.description}>
                {description}
              </Typography>
            )}
          </div>

          {primaryButton && <Footer primaryButton={primaryButton} secondaryButton={secondaryButton} />}
        </div>
      </div>
    </div>
  );
}
