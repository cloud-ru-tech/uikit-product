import { Children, isValidElement, useRef, useState } from 'react';

import { ChevronDownSVG, KebabSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AdaptiveDropdown, MobileDroplist, MobileDroplistProps } from '@cloud-ru/uikit-product-mobile-dropdown';
import { MobileTooltip, WithMobileTooltip } from '@cloud-ru/uikit-product-mobile-tooltip';
import { checkExceeded, QuotaCardProps, QuotaDropdownContent } from '@cloud-ru/uikit-product-quota';
import { ButtonOutline } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { useDynamicList } from '@snack-uikit/utils';

import { ActionView } from './ActionView';
import { BUTTON_TYPE } from './constants';
import { hasVisibleActions } from './helpers';
import styles from './styles.module.scss';
import { ActionsProps } from './types';

export function MobileActions({ items, maxVisibleItems }: ActionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const { visibleItems, hiddenItems } = useDynamicList({ parentContainerRef: containerRef, items, maxVisibleItems });

  const { t: tQuota } = useLocale('Quota');

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
                    itemWrapRender: item => (
                      <WithMobileTooltip {...action.tooltip}>
                        {action.href && !action.disabled ? (
                          <a href={action.href} target='_blank' rel='noreferrer'>
                            {item}
                          </a>
                        ) : (
                          item
                        )}
                      </WithMobileTooltip>
                    ),
                  });
                  break;
                }
                case BUTTON_TYPE.Quota: {
                  const quotaExceededCount = Children.toArray(action.children).reduce<number>(
                    (count, child) =>
                      isValidElement<QuotaCardProps>(child) &&
                      !child?.props?.loading &&
                      !child?.props?.unlimited &&
                      checkExceeded((child?.props?.limit ?? 0) - (child?.props?.created ?? 0))
                        ? count + 1
                        : count,
                    0,
                  );

                  const isQuotaExceededCountVisible = !action.dataError && quotaExceededCount > 0;

                  acc.push({
                    ...action,
                    type: 'group',
                    divider: acc.length > 0,
                    items: [
                      {
                        ...action,
                        content: {
                          option: tQuota('quotas'),
                        },
                        afterContent: (
                          <>
                            {isQuotaExceededCountVisible && (
                              <Counter value={quotaExceededCount} appearance='red' size='m' />
                            )}
                            <ChevronDownSVG />
                          </>
                        ),

                        itemWrapRender: item => {
                          const content = (
                            <AdaptiveDropdown content={<QuotaDropdownContent {...action} />} layoutType='mobile'>
                              {item}
                            </AdaptiveDropdown>
                          );

                          return action.tooltip ? (
                            <MobileTooltip {...action.tooltip}>{content}</MobileTooltip>
                          ) : (
                            content
                          );
                        },
                      },
                    ],
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
                case BUTTON_TYPE.Dropdown: {
                  acc.push({
                    ...action,
                    type: 'group',
                    divider: acc.length > 0,
                    items: [
                      {
                        ...action.button,
                        content: { option: action.button.label ?? '' },
                        onClick: event => {
                          action.button.onClick?.(event);
                        },
                        afterContent: <ChevronDownSVG />,
                        itemWrapRender: item => {
                          const content = (
                            <AdaptiveDropdown {...action.dropdown} layoutType='mobile'>
                              {item}
                            </AdaptiveDropdown>
                          );

                          return action.tooltip ? (
                            <MobileTooltip {...action.tooltip}>{content}</MobileTooltip>
                          ) : (
                            content
                          );
                        },
                      },
                    ],
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
          <ButtonOutline appearance='neutral' icon={<KebabSVG />} size='m' />
        </MobileDroplist>
      )}

      {visibleItemsWithoutKebab.map((action, index) => (
        <ActionView
          {...action}
          key={index}
          layoutType='mobile'
          commonProps={{
            className: styles.button,
            size: 'm',
            fullWidth: true,
          }}
        />
      ))}
    </div>
  );
}
