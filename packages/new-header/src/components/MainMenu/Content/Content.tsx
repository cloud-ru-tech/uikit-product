import { MouseEvent, ReactElement, ReactNode, useCallback, useMemo } from 'react';

import { CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { TitleClickable } from '@sbercloud/uikit-product-title-clickable';

import { LinksGroup } from '../types';
import styles from './styles.module.scss';

export type ContentProps = {
  searchValue?: string;

  serviceGroups?: LinksGroup[];

  search?: ReactNode;

  banners?: ReactNode;

  cards?: ReactElement[];

  footer?: ReactNode;

  favorite?: {
    value: string[];
    onChange: (productId: string) => (addingValue: boolean) => void;
  };

  isMobile?: boolean;

  initialEmpty?: boolean;

  className?: string;

  onLinkChange?: (value: string) => void;

  onClose?(): void;
};

export function Content({
  searchValue,
  banners,
  search,
  serviceGroups,
  className,
  footer,
  favorite,
  isMobile,
  onClose,
  onLinkChange,
}: ContentProps) {
  const { t } = useLocale('Header');

  const wrappedClick = useCallback(
    ({ disabled, onClick }: { disabled?: boolean; onClick?(e?: MouseEvent<HTMLElement>): void }, cb?: () => void) =>
      (e?: MouseEvent<HTMLElement>) => {
        if (disabled) {
          e?.preventDefault();
          return;
        }

        if (!e?.metaKey) {
          e?.preventDefault();
          onClose?.();
        }

        onClick?.(e);

        cb?.();
      },
    [onClose],
  );

  const cards = useMemo(
    () =>
      serviceGroups?.map(({ id, label, items }) => (
        <div key={String(id)} className={styles.card} id={id} data-test-id={`header__drawer-menu__group-card-${id}`}>
          {!label.onClick ? (
            <span className={styles.cardTitle}>{label.text}</span>
          ) : (
            <TitleClickable title={label.text} href='#' onClick={label.onClick} />
          )}

          <div className={styles.cardBody} data-mobile={isMobile || undefined}>
            {items.map(service => (
              <CardServiceSmall
                key={String(id) + service.id}
                title={service.label}
                emblem={{ icon: service.icon }}
                data-test-id={`header__drawer-menu__link-${service.id}`}
                outline
                href={service.href}
                onClick={wrappedClick(service, () => onLinkChange?.(service.id))}
                favorite={
                  favorite
                    ? {
                        checked: favorite?.value.includes(service.id),
                        onChange: favorite?.onChange(service.id),
                        visibilityStrategy: isMobile ? 'always' : 'hover',
                        enabled: !service.disabled,
                      }
                    : undefined
                }
                promoBadge={service.badge}
              />
            ))}
          </div>
        </div>
      )),
    [favorite, isMobile, onLinkChange, serviceGroups, wrappedClick],
  );

  return (
    <>
      {(Boolean(serviceGroups?.length) || searchValue) && search}

      <div className={className}>
        {!searchValue && banners}

        {cards}

        {!cards?.length && !searchValue && (
          <div className={styles.noData} data-test-id='header__drawer-menu__no-data'>
            {t('noData')}
          </div>
        )}

        {!cards?.length && searchValue && (
          <div className={styles.noData} data-test-id='header__drawer-menu__no-data-found'>
            {t('noDataFound')}
          </div>
        )}

        {footer}
      </div>
    </>
  );
}
