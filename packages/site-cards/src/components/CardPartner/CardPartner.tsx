import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEvent } from 'react';

import { RichText } from '@cloud-ru/uikit-product-site-rich-text';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Card } from '@snack-uikit/card';

import { useCardInteractions } from '../../hooks';
import styles from './styles.module.scss';

export type CardPartnerProps = WithSupportProps<
  WithLayoutType<{
    /** Описание карточки */
    description: string;
    /** Ссылка */
    href?: string;
    /** HTML-аттрибут target */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    /** Колбек клика*/
    onClick?(e?: MouseEvent<HTMLDivElement | HTMLAnchorElement>): void;
    /** Ссылка на логотип */
    logo: {
      src: string;
      alt: string;
    };
    /* Включение обводки */
    outline?: boolean;
    /**
     * Является ли деактивированным
     * @default false
     */
    disabled?: boolean;
    /** CSS-класс */
    className?: string;
  }>
>;

export function CardPartner({
  description,
  logo,
  href,
  target = '_blank',
  onClick,
  disabled = false,
  className,
  layoutType,
  outline,
  'data-test-id': dataTestId = 'card-partner',
  ...rest
}: CardPartnerProps) {
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
      outline={outline}
      data-test-id={dataTestId}
    >
      <div className={styles.wrapper} data-layout-type={layoutType}>
        <div className={styles.logo}>
          {href ? (
            <a
              tabIndex={-1}
              ref={anchorRef}
              href={href}
              target={target}
              onClick={handleLinkClick}
              data-test-id={`${dataTestId}__link`}
            >
              <img src={logo.src} alt={logo.alt} data-test-id={`${dataTestId}__logo`} />
            </a>
          ) : (
            <img src={logo.src} alt={logo.alt} data-test-id={`${dataTestId}__logo`} />
          )}
        </div>

        <RichText richText={description} className={styles.description} data-test-id={`${dataTestId}__description`} />
      </div>
    </Card>
  );
}
