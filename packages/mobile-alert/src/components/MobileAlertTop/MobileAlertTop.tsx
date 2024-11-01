import cn from 'classnames';
import { MouseEventHandler, ReactNode, RefObject, useCallback, useRef, useState } from 'react';

import { ChevronDownSVG, ChevronUpSVG, CrossSVG } from '@sbercloud/uikit-product-icons';
import { Link, LinkProps } from '@snack-uikit/link';
import { extractSupportProps, isBrowser, useLayoutEffect, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, APPEARANCE_TO_COLOR_MAP } from '../../constants';
import { AlertButton, AlertButtonProps } from '../../helperComponents';
import { Appearance } from '../../types';
import { APPEARANCE_TO_COLOR_MAP_INVERT } from './constants';
import styles from './styles.module.scss';

export type MobileAlertTopProps = WithSupportProps<{
  /** Заголовок */
  title?: string;
  /** Описание */
  description: ReactNode;
  /** Cсылка */
  link?: Pick<LinkProps, 'text' | 'target' | 'onClick' | 'href' | 'appearance'>;
  /** Кнопка дополнительного действия */
  action?: AlertButtonProps;
  /** Колбек закрытия */
  onClose?: () => void;
  /** Внешний вид */
  appearance?: Appearance;
  /** CSS-класс */
  className?: string;
  truncate?: {
    title?: number;
  };
  icon?: boolean;
}>;

const ONE_LINE_TEXT_HEIGHT = 20;

/**
 * Компонент для отображения уведомления вверху экрана.
 */
export function MobileAlertTop({
  title,
  description,
  link,
  onClose,
  appearance = APPEARANCE.Neutral,
  action,
  className,
  ...rest
}: MobileAlertTopProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTitleLarge, setIsTitleLarge] = useState(false);
  const [isDescriptionLarge, setIsDescriptionLarge] = useState(false);

  const invertAppearance = APPEARANCE_TO_COLOR_MAP_INVERT[appearance];
  const handleExpand = () => setIsExpanded(val => !val);
  const canExpand = Boolean(isTitleLarge || isDescriptionLarge || link || action);
  const showCloseButton = Boolean(onClose && ((canExpand && isExpanded) || !canExpand));
  const showLink = Boolean(link && isExpanded);
  const showAction = Boolean(action && isExpanded);

  const handleClose: MouseEventHandler = event => {
    event.stopPropagation();
    onClose?.();
  };

  const handleActionButtonClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();
    action?.onClick?.(event);
  };

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = event => {
    event.stopPropagation();
    link?.onClick?.(event);
  };

  const updateIsLarge = useCallback(
    ({ ref, setter }: { ref: RefObject<HTMLDivElement>; setter(value: boolean): void }) => {
      const element = ref.current;

      if (element) {
        const { offsetWidth, scrollWidth, offsetHeight } = element;
        setter(offsetHeight > ONE_LINE_TEXT_HEIGHT || scrollWidth > offsetWidth);
      }
    },
    [],
  );

  const observeElement = useCallback(
    ({ ref, setter }: { ref: RefObject<HTMLDivElement>; setter(value: boolean): void }) => {
      const refElement = ref.current;

      if (refElement && isBrowser()) {
        const observer = new ResizeObserver(entities =>
          entities.forEach(entity => {
            if (entity.target === refElement) {
              updateIsLarge({ ref, setter });
            }
          }),
        );

        observer.observe(refElement);

        return () => observer.disconnect();
      }
    },
    [updateIsLarge],
  );

  useLayoutEffect(() => observeElement({ ref: titleRef, setter: setIsTitleLarge }), [observeElement]);
  useLayoutEffect(() => updateIsLarge({ ref: titleRef, setter: setIsTitleLarge }), [title, updateIsLarge]);

  useLayoutEffect(() => observeElement({ ref: descriptionRef, setter: setIsDescriptionLarge }), [observeElement]);

  useLayoutEffect(
    () => updateIsLarge({ ref: descriptionRef, setter: setIsDescriptionLarge }),
    [description, updateIsLarge],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className={cn(styles.alertTop, className)}
      {...extractSupportProps(rest)}
      data-color={invertAppearance}
      role='alert'
      onClick={canExpand ? handleExpand : undefined}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.contentLayout}>
          <div className={styles.textLayout} data-expanded={isExpanded || undefined}>
            {title && (
              <div
                className={styles.title}
                ref={titleRef}
                data-color={invertAppearance}
                data-test-id='alert-top__title'
              >
                {title}
              </div>
            )}

            <div
              className={styles.description}
              ref={descriptionRef}
              data-color={invertAppearance}
              data-test-id='alert-top__description'
              data-expanded={isExpanded || undefined}
            >
              {description}
            </div>
          </div>

          {showLink && (
            <span>
              <Link
                {...link}
                onClick={handleLinkClick}
                appearance={APPEARANCE_TO_COLOR_MAP[appearance]}
                textMode='on-accent'
                size='m'
                data-test-id='alert-top__link'
              />
            </span>
          )}
        </div>

        {showAction && (
          <AlertButton {...action} onClick={handleActionButtonClick} appearance={invertAppearance} variant='tonal' />
        )}
      </div>

      <div className={styles.actions}>
        {canExpand && (
          <div
            className={styles.expandingIcon}
            data-appearance={invertAppearance}
            data-test-id='alert-top__expanding-icon'
          >
            {isExpanded ? <ChevronUpSVG /> : <ChevronDownSVG />}
          </div>
        )}

        {showCloseButton && (
          <AlertButton
            onClick={handleClose}
            appearance={invertAppearance}
            icon={<CrossSVG />}
            variant='tonal'
            dataTestId='alert-top__close-button'
          />
        )}
      </div>
    </div>
  );
}
