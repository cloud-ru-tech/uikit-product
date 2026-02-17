import cn from 'classnames';
import { MouseEvent as ReactMouseEvent, ReactNode } from 'react';

import { CrossSVG, UpdateSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AdaptiveDroplistProps, MobileDroplistProps } from '@cloud-ru/uikit-product-mobile-dropdown';
import { TitleClickable } from '@cloud-ru/uikit-product-title-clickable';
import { ButtonFilled } from '@snack-uikit/button';
import { InfoBlock } from '@snack-uikit/info-block';
import { Skeleton } from '@snack-uikit/skeleton';
import { extractSupportProps } from '@snack-uikit/utils';

import { ActionView } from '../../helperComponents/Actions/ActionView';
import { BUTTON_TYPE } from '../../helperComponents/Actions/constants';
import { DesktopActions } from '../../helperComponents/Actions/DesktopActions';
import { MobileActions } from '../../helperComponents/Actions/MobileActions';
import { Action } from '../../helperComponents/Actions/types';
import { ButtonKebab } from '../../helperComponents/ButtonKebab';
import styles from './styles.module.scss';
import { WidgetProps } from './types';

export function Widget({
  header,
  children,
  actions = [],
  wide: wideProp = false,
  state = 'default',
  loadingState,
  errorState,
  className,
  layoutType,
  actionsChildren,
  controlChildren,
  ...rest
}: WidgetProps) {
  const { t } = useLocale('Widget');
  const isMobile = layoutType === 'mobile';
  const wide = wideProp && !isMobile;

  const renderContent = (): ReactNode => {
    switch (state) {
      case 'loading': {
        if (loadingState?.loadingContent) {
          return loadingState.loadingContent;
        }

        if (loadingState?.showSkeleton) {
          return (
            <div className={styles.skeletonContent}>
              <Skeleton loading width='100%' height={80} borderRadius={8} />
            </div>
          );
        }

        return null;
      }

      case 'error': {
        return (
          <InfoBlock
            size='m'
            className={styles.infoBlock}
            icon={errorState?.errorIcon ?? { icon: CrossSVG, appearance: 'neutral', decor: true }}
            title={errorState?.errorTitle || t('dataErrorTitle')}
            description={errorState?.errorDescription || t('dataErrorDescription')}
            footer={
              <ButtonFilled
                size={isMobile ? 'm' : 's'}
                label={errorState?.updateButtonLabel || t('updateWidget')}
                appearance='neutral'
                icon={<UpdateSVG />}
                onClick={errorState?.onClickUpdate}
              />
            }
          />
        );
      }

      case 'default':
      default: {
        return children;
      }
    }
  };

  const renderActionsSkeleton = () => (
    <div className={cn(styles.actionsWrapper, { [styles.actionsWide]: wide })}>
      <div className={styles.skeletonActions}>
        {wide ? (
          <>
            <Skeleton loading width={96} height={32} borderRadius={8} />
            <Skeleton loading width={32} height={32} borderRadius={8} />
          </>
        ) : (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Skeleton loading width={'100%'} height={32} borderRadius={8} />
            </div>
            <Skeleton loading width={32} height={32} borderRadius={8} />
          </>
        )}
      </div>
    </div>
  );

  const getPrimaryAction = (items: Action[]): Action | undefined => {
    const index = items.findIndex(a => a.variant !== BUTTON_TYPE.Droplist && a.variant !== BUTTON_TYPE.Kebab);
    return index >= 0 ? items[index] : undefined;
  };

  const buildKebabItems = (items: Action[]): NonNullable<MobileDroplistProps['items']> =>
    items.reduce<NonNullable<MobileDroplistProps['items']>>(
      (acc, action) => {
        if (action.variant === BUTTON_TYPE.Droplist || action.variant === BUTTON_TYPE.Kebab) {
          acc.push({
            type: 'group',
            label: action.variant === BUTTON_TYPE.Droplist ? action.button?.label : undefined,
            items: action.list.items,
            divider: acc.length > 0,
          });
        } else {
          acc.push({
            content: { option: action.label ?? '' },
            beforeContent: action.icon,
            onClick: (event: ReactMouseEvent<HTMLElement>) => {
              action.onClick?.(event as never);
            },
          });
        }
        return acc;
      },
      [] as NonNullable<MobileDroplistProps['items']>,
    );

  const renderActions = () => {
    if (state === 'loading') {
      return renderActionsSkeleton();
    }

    if (!actions.length && !actionsChildren) return null;

    if (wide) {
      return (
        <div className={cn(styles.actionsWrapper, { [styles.actionsWide]: wide })}>
          {actionsChildren}
          {isMobile ? <MobileActions items={actions} /> : <DesktopActions items={actions} />}
        </div>
      );
    }

    const primaryAction = getPrimaryAction(actions);
    const kebabItemsMobile = buildKebabItems(actions);

    return (
      <div className={cn(styles.actionsWrapper)}>
        {actionsChildren}
        {primaryAction && (
          <ActionView
            {...primaryAction}
            layoutType={layoutType}
            commonProps={{ size: isMobile ? 'm' : 's', fullWidth: true }}
          />
        )}
        {Boolean(kebabItemsMobile.length) && (
          <ButtonKebab
            layoutType={layoutType}
            list={{
              items: kebabItemsMobile as unknown as AdaptiveDroplistProps['items'],
              closeDroplistOnItemClick: true,
            }}
          />
        )}
      </div>
    );
  };

  const renderControlBlock = () => {
    if (!controlChildren && !wide) return null;

    const content =
      state === 'loading'
        ? !wide && <Skeleton loading width={wide ? 120 : '100%'} height={32} borderRadius={8} />
        : controlChildren;

    return (
      <div className={styles.controlWrapper} data-mobile={!wide || undefined}>
        {content}
        {wide && renderActions()}
      </div>
    );
  };

  return (
    <div className={cn(styles.widget, className)} {...extractSupportProps(rest)}>
      <div
        className={styles.widgetHeader}
        data-mobile={!wide || undefined}
        data-loading={state === 'loading' || undefined}
      >
        {state === 'loading' ? (
          <div className={styles.skeletonHeader}>
            <Skeleton loading width={wide ? 120 : '100%'} height={32} borderRadius={8} />
          </div>
        ) : (
          <TitleClickable
            fullWidth={isMobile || !wideProp}
            {...header}
            className={cn(styles.titleClickable, header.className)}
          />
        )}

        {renderControlBlock()}
      </div>

      <div className={styles.widgetContent}>{renderContent()}</div>

      {!wide && renderActions()}
    </div>
  );
}
