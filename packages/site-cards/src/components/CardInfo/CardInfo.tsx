import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEvent } from 'react';

import { RichText } from '@cloud-ru/uikit-product-site-rich-text';
import { TagSpecial, TagSpecialProps } from '@cloud-ru/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Card } from '@snack-uikit/card';
import { Typography } from '@snack-uikit/typography';

import { Icon, IconProps } from '../../helperComponents/Icon';
import { useCardInteractions } from '../../hooks';
import { getTypographySize } from '../utils';
import styles from './styles.module.scss';

export type CardInfoProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок карточки*/
    title: string;
    /** Описание карточки */
    description?: string;
    /** Ссылка */
    href?: string;
    /** HTML-аттрибут target */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    /** Колбек клика*/
    onClick?(e?: MouseEvent<HTMLDivElement | HTMLAnchorElement>): void;
    /** Слот под иконку/кастомную ноду */
    icon?: IconProps['icon'];
    /** Тег */
    tag?: Pick<TagSpecialProps, 'text' | 'appearance'>;
    /**
     * Является ли деактивированным
     * @default false
     */
    disabled?: boolean;
    /** Наличие обводки */
    outline?: boolean;
    /** CSS-класс */
    className?: string;
  }>
>;

export function CardInfo({
  title,
  description,
  icon,
  href,
  target = '_blank',
  onClick,
  tag,
  disabled = false,
  className,
  layoutType,
  outline,
  'data-test-id': dataTestId = 'card-info',
  ...rest
}: CardInfoProps) {
  const { anchorRef, handleLinkClick, handleCardClick, handleCardKeyDown } = useCardInteractions({
    href,
    disabled,
    onClick,
  });

  return (
    <Card
      {...extractSupportProps(rest)}
      size='m'
      className={cn(styles.card, className)}
      disabled={disabled}
      outline={outline}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      data-test-id={dataTestId}
    >
      <div data-layout-type={layoutType} className={styles.wrapper}>
        {tag && <TagSpecial {...tag} className={styles.tag} data-test-id={`${dataTestId}__tag`} />}

        {icon && <Icon size='m' data-test-id={`${dataTestId}__icon`} icon={icon} />}

        <div className={styles.content}>
          <Typography
            tag='h3'
            family='sans'
            purpose='title'
            size={getTypographySize(layoutType)}
            className={styles.title}
            data-test-id={`${dataTestId}__title`}
          >
            {href ? (
              <a
                tabIndex={-1}
                ref={anchorRef}
                href={href}
                target={target}
                onClick={handleLinkClick}
                data-test-id={`${dataTestId}__title-link`}
              >
                <RichText richText={title} />
              </a>
            ) : (
              <RichText richText={title} />
            )}
          </Typography>

          {description && (
            <Typography
              tag='div'
              family='sans'
              purpose='body'
              size={getTypographySize(layoutType)}
              data-test-id={`${dataTestId}__description`}
            >
              <RichText className={styles.description} richText={description} />
            </Typography>
          )}
        </div>
      </div>
    </Card>
  );
}
