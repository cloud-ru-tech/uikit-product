import cn from 'classnames';
import { useRef, useState } from 'react';

import { KebabSVG } from '@sbercloud/uikit-product-icons';
import { MobileDroplist } from '@sbercloud/uikit-product-mobile-dropdown';
import { MobileTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { ButtonOutline } from '@snack-uikit/button';
import { useDynamicList } from '@snack-uikit/utils';

import { ActionView } from './ActionView';
import styles from './styles.module.scss';
import { ActionsProps } from './types';

export function MobileActions({ items, maxVisibleItems }: ActionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const { visibleItems, hiddenItems } = useDynamicList({ parentContainerRef: containerRef, items, maxVisibleItems });

  return (
    <div className={styles.mobileActionsWrapper} ref={containerRef}>
      {visibleItems.map((action, index) => (
        <ActionView
          {...action}
          key={index}
          layoutType='mobile'
          className={cn(styles.button, action.className)}
          size='m'
          fullWidth={true}
        />
      ))}

      {hiddenItems.length > 0 && (
        <MobileDroplist
          open={isOpen}
          onOpenChange={setIsOpen}
          items={hiddenItems.map(action => ({
            ...action,
            content: { option: action.label ?? '' },
            onClick: event => {
              setIsOpen(false);
              action.onClick?.(event);
            },
            beforeContent: action.icon,
            itemWrapRender: action.tooltip
              ? item => (
                  <MobileTooltip tip={action.tooltip?.tip ?? ''} {...action.tooltip}>
                    {item}
                  </MobileTooltip>
                )
              : undefined,
          }))}
        >
          <ButtonOutline appearance='neutral' icon={<KebabSVG />} size='m' />
        </MobileDroplist>
      )}
    </div>
  );
}
