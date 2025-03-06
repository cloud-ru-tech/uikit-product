import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEvent } from 'react';

import { Icon, IconProps, useCardInteractions } from '@sbercloud/uikit-product-site-cards';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Card } from '@snack-uikit/card';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { getTypographySize } from './utils';

export type CardSocialProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок карточки*/
    title: string;
    /** Описание карточки */
    description?: string;
    /** Ссылка */
    href: string;
    /** HTML-аттрибут target */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    /** Колбек клика*/
    onClick?(e?: MouseEvent<HTMLDivElement | HTMLAnchorElement>): void;
    /** Слот под иконку/кастомную ноду */
    icon?: IconProps['icon'];
    /**
     * Является ли деактивированным
     * @default false
     */
    disabled?: boolean;
    /** CSS-класс */
    className?: string;
  }>
>;

export function CardSocial({
  title,
  description,
  icon,
  href,
  target = '_blank',
  onClick,
  disabled = false,
  className,
  layoutType,
  'data-test-id': dataTestId = 'card-social',
  ...rest
}: CardSocialProps) {
  const { anchorRef, handleCardKeyDown, handleCardClick, handleLinkClick } = useCardInteractions({
    href,
    onClick,
    disabled,
  });

  return (
    <Card
      {...extractSupportProps(rest)}
      size='m'
      className={cn(styles.card, className)}
      disabled={disabled}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      data-test-id={dataTestId}
    >
      <div data-layout-type={layoutType} className={styles.wrapper}>
        {icon && <Icon size='l' data-test-id={`${dataTestId}__icon`} icon={icon} />}

        <div className={styles.content}>
          <Typography
            tag='h3'
            family='sans'
            purpose='title'
            size={getTypographySize(layoutType)}
            className={styles.title}
            data-test-id={`${dataTestId}__title`}
          >
            <a
              tabIndex={-1}
              ref={anchorRef}
              href={href}
              target={target}
              onClick={handleLinkClick}
              data-test-id={`${dataTestId}__title-link`}
            >
              {title}
            </a>
          </Typography>

          {description && (
            <Typography
              tag='h3'
              family='sans'
              purpose='body'
              size={getTypographySize(layoutType)}
              className={styles.description}
              data-test-id={`${dataTestId}__description`}
            >
              {description}
            </Typography>
          )}
        </div>
      </div>
    </Card>
  );
}
