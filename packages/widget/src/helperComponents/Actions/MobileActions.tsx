import { useRef, useState } from 'react';

import { KebabSVG } from '@sbercloud/uikit-product-icons';
import { MobileDroplist, MobileDroplistProps } from '@sbercloud/uikit-product-mobile-dropdown';
import { MobileTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { ButtonOutline } from '@snack-uikit/button';
import { useDynamicList } from '@snack-uikit/utils';

import { ActionView } from './ActionView';
import { BUTTON_TYPE } from './constants';
import { hasVisibleActions } from './helpers';
import styles from './styles.module.scss';
import { ActionsProps } from './types';

export function MobileActions({ items }: ActionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const { visibleItems, hiddenItems } = useDynamicList({ parentContainerRef: containerRef, items, maxVisibleItems: 2 });

  if (!hasVisibleActions(items)) {
    return null;
  }

  const hiddenItemsWithKebab = hiddenItems.concat(visibleItems.filter(item => item.variant === 'kebab'));
  const visibleItemsWithoutKebab = visibleItems.filter(item => item.variant !== 'kebab');

  return (
    <div className={styles.mobileActionsWrapper} ref={containerRef}>
      {hiddenItemsWithKebab.length > 0 && (
        <MobileDroplist
          open={isOpen}
          onOpenChange={setIsOpen}
          items={hiddenItemsWithKebab.reduce(
            (acc, action) => {
              switch (action.variant) {
                case BUTTON_TYPE.Tonal:
                case BUTTON_TYPE.Simple:
                case BUTTON_TYPE.Outline:
                case BUTTON_TYPE.Function:
                case BUTTON_TYPE.Filled: {
                  acc.push({
                    ...action,
                    content: { option: action.label ?? '' },
                    onClick: event => {
                      setIsOpen(false);
                      action.onClick?.(event);
                    },
                    beforeContent: action?.icon,
                    itemWrapRender: action.tooltip
                      ? item => (
                          <MobileTooltip tip={action.tooltip?.tip ?? ''} {...action.tooltip}>
                            {item}
                          </MobileTooltip>
                        )
                      : undefined,
                  });
                  break;
                }

                case BUTTON_TYPE.Droplist:
                case BUTTON_TYPE.Kebab: {
                  const needDivider = Boolean(action.variant === 'droplist' && action?.button.label) || acc.length > 0;

                  acc.push({
                    ...action,
                    type: 'group',
                    label: action.variant === 'droplist' ? action?.button.label : undefined,
                    divider: needDivider,
                    items: action.list.items.map(item => ({
                      ...item,
                      onClick: event => {
                        setIsOpen(false);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        item.onClick?.(event);
                      },
                    })),
                  });
                  break;
                }

                default: {
                  break;
                }
              }

              return acc;
            },
            [] as MobileDroplistProps['items'],
          )}
        >
          <ButtonOutline appearance='neutral' icon={<KebabSVG />} size='s' />
        </MobileDroplist>
      )}

      {visibleItemsWithoutKebab.map((action, index) => (
        <ActionView
          {...action}
          key={index}
          layoutType='mobile'
          commonProps={{
            className: styles.button,
            size: 's',
            fullWidth: true,
          }}
        />
      ))}
    </div>
  );
}
