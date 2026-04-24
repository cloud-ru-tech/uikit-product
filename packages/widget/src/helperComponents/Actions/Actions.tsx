import { MouseEvent } from 'react';

import { AdaptiveDroplistProps, MobileDroplistProps } from '@cloud-ru/uikit-product-mobile-dropdown';
import { Skeleton } from '@snack-uikit/skeleton';

import { WidgetProps } from '../../components/Widget/types';
import { ButtonKebab } from '../ButtonKebab';
import { ActionView } from './ActionView';
import { BUTTON_TYPE } from './constants';
import { DesktopActions } from './DesktopActions';
import { MobileActions } from './MobileActions';
import styles from './styles.module.scss';
import { Action } from './types';

function ActionsSkeleton({ wide }: Pick<WidgetProps, 'wide'>) {
  return (
    <div className={styles.actionsWrapper} data-wide={wide || undefined}>
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
}

const getPrimaryAction = (items: Action[]): { action?: Action; index: number } => {
  const index = items.findIndex(a => a.variant !== BUTTON_TYPE.Droplist && a.variant !== BUTTON_TYPE.Kebab);
  return index >= 0 ? { action: items[index], index } : { index: -1 };
};

const buildKebabItems = (items: Action[], primaryActionIndex: number): NonNullable<MobileDroplistProps['items']> =>
  items.reduce<NonNullable<MobileDroplistProps['items']>>(
    (acc, action, index) => {
      if (action.variant === BUTTON_TYPE.Droplist || action.variant === BUTTON_TYPE.Kebab) {
        acc.push({
          type: 'group',
          label: action.variant === BUTTON_TYPE.Droplist ? action.button?.label : undefined,
          items: action.list.items,
          divider: acc.length > 0,
        });
      } else {
        if (index !== primaryActionIndex) {
          acc.push({
            content: { option: action.label ?? '' },
            beforeContent: action.icon,
            onClick: (event: MouseEvent<HTMLElement>) => {
              action.onClick?.(event as never);
            },
          });
        }
      }

      return acc;
    },
    [] as NonNullable<MobileDroplistProps['items']>,
  );

export function Actions({
  actions = [],
  actionsChildren,
  wide,
  state,
  layoutType,
}: Pick<WidgetProps, 'actions' | 'actionsChildren' | 'state' | 'wide' | 'layoutType'>) {
  const isMobile = layoutType === 'mobile';

  if (state === 'loading') {
    return <ActionsSkeleton wide={wide} />;
  }

  if (!actions.length && !actionsChildren) return null;

  if (wide) {
    return (
      <div data-wide={wide || undefined} className={styles.actionsWrapper}>
        {actionsChildren}
        {isMobile ? <MobileActions items={actions} /> : <DesktopActions items={actions} />}
      </div>
    );
  }

  const { action: primaryAction, index: primaryActionIndex } = getPrimaryAction(actions);
  const kebabItemsMobile = buildKebabItems(actions, primaryActionIndex);

  return (
    <div className={styles.actionsWrapper}>
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
}
