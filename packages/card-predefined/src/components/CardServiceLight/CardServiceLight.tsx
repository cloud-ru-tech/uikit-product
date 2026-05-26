import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  Ref,
  useMemo,
  useRef,
} from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { PromoTagPredefined, PromoTagPredefinedProps } from '@cloud-ru/uikit-product-promo-tag-predefined';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Favorite } from '@snack-uikit/toggles';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { TEST_IDS, TRIGGER_CLICK_KEY_CODES, VISIBILITY_STRATEGY } from './constants';
import styles from './styles.module.scss';
import { VisibilityStrategy } from './types';

type CardElement = HTMLAnchorElement | HTMLButtonElement;

export type CardServiceLightProps = WithLayoutType<
  WithSupportProps<{
    /** Иконка сервиса */
    icon: ReactElement;
    /** Заголовок карточки */
    title: string;
    /** Ссылка, открываемая при клике по карточке */
    href?: string;
    /** Тип кнопки */
    type?: 'button' | 'submit' | 'reset';
    /** Настройки promo tag. При отсутствии не отображается */
    promoTag?: Omit<PromoTagPredefinedProps, 'trigger'>;
    /** Колбек на клик по карточке */
    onClick?(event: MouseEvent<CardElement>): void;
    /** Колбек нажатия клавиши клавиатуры на карточке */
    onKeyDown?: KeyboardEventHandler<CardElement>;
    /** Настройки обрезки текста заголовка */
    truncate?: {
      /** Максимальное количество строк заголовка */
      title?: number;
    };
    /** Настройки кнопки «Избранное» */
    favorite?: {
      /** Включить отображение кнопки избранного */
      enabled: boolean;
      /**
       * Формат отображения: всегда или при наведении и фокусе
       * @default 'hover'
       */
      visibilityStrategy?: VisibilityStrategy;
      /** Состояние избранного. При передаче вместе с `onChange` компонент работает в controlled-режиме */
      checked?: boolean;
      /** Колбек изменения состояния избранного. При передаче вместе с `checked` компонент работает в controlled-режиме */
      onChange?(value: boolean): void;
    };
    /** CSS-класс корневого элемента */
    className?: string;
  }>
>;

export const CardServiceLight = forwardRef<CardElement, CardServiceLightProps>(
  (
    {
      href,
      type: typeProp,
      promoTag,
      title,
      icon,
      onClick,
      onKeyDown: onKeyDownProp,
      className,
      truncate,
      favorite,
      layoutType,
      ...rest
    },
    ref,
  ) => {
    const [isFavorite, setIsFavorite] = useUncontrolledProp(favorite?.checked, false, favorite?.onChange);
    const componentRef = useRef<CardElement>(null);
    const favoriteRef = useRef<HTMLInputElement>(null);

    const Component = href ? 'a' : 'button';

    const onKeyDown = (e: KeyboardEvent<CardElement>) => {
      if (e.target !== componentRef.current) {
        onKeyDownProp?.(e);

        return;
      }

      if (e.code === 'ArrowRight' && favorite?.enabled) {
        favoriteRef.current?.focus();
      }

      if (TRIGGER_CLICK_KEY_CODES.includes(e.code)) {
        e.preventDefault();
        href ? componentRef.current?.click() : componentRef.current?.click();
      }

      onKeyDownProp?.(e);
    };

    const onFavoriteKeyUp: KeyboardEventHandler = event => {
      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        componentRef.current?.focus();
      }

      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        setIsFavorite(!isFavorite);
      }
    };

    const onFavoriteClick: MouseEventHandler = event => {
      event.stopPropagation();

      favoriteRef.current?.blur();
    };

    const attributes = useMemo(() => {
      if (href) {
        return {
          href,
        };
      }

      return {
        type: typeProp ?? 'button',
      };
    }, [href, typeProp]);

    const promoTagProps: PromoTagPredefinedProps | null = useMemo(() => {
      if (!promoTag) {
        return null;
      }

      const tooltipProps: PromoTagPredefinedProps['tooltip'] = {
        ...(promoTag?.tooltip || {}),
        trigger: 'hover',
      };

      return {
        ...promoTag,
        tooltip: tooltipProps,
      };
    }, [promoTag]);

    return (
      <Component
        ref={mergeRefs(ref, componentRef) as Ref<HTMLAnchorElement> & Ref<HTMLButtonElement>}
        className={cn(styles.card, className)}
        {...extractSupportProps(rest)}
        {...attributes}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <div className={styles.container}>
          <div className={styles.icon}>{icon}</div>

          <div className={styles.content} data-layout-type={layoutType}>
            <Typography.SansBodyM className={styles.title} data-test-id={TEST_IDS.title}>
              <TruncateString text={title} maxLines={truncate?.title} variant='end' />
            </Typography.SansBodyM>

            {promoTagProps && <PromoTagPredefined {...promoTagProps} data-test-id={TEST_IDS.promoTag} />}
          </div>

          {favorite?.enabled && (
            <div
              className={styles.favoriteWrapper}
              data-visibility-strategy={favorite.visibilityStrategy || VISIBILITY_STRATEGY.hover}
              data-checked={isFavorite || undefined}
            >
              <Favorite
                size='m'
                checked={isFavorite}
                inputRef={favoriteRef}
                onChange={setIsFavorite}
                tabIndex={-1}
                onKeyUp={onFavoriteKeyUp}
                onClick={onFavoriteClick}
                data-test-id={TEST_IDS.favorite}
                icon='star'
              />
            </div>
          )}
        </div>
      </Component>
    );
  },
);
