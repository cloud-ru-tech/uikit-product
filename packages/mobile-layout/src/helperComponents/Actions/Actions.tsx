import { ReactNode, useRef, useState } from 'react';

import { KebabSVG } from '@sbercloud/uikit-product-icons';
import { MobileDropdown } from '@sbercloud/uikit-product-mobile-dropdown';
import { ButtonFilled, ButtonFunction, ButtonOutline, ButtonSimple, ButtonTonal } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

import { BUTTON_TYPE } from './constants';
import { useDynamicList } from './hooks';
import styles from './styles.module.scss';
import { ActionsProps } from './types';

export function Actions({ items }: ActionsProps) {
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const { visibleActions, hiddenActions } = useDynamicList({ containerRef, buttonRefs, items });

  return (
    <div className={styles.actionsWrapper} ref={containerRef}>
      {visibleActions.map(({ variant, tooltip, ...buttonProps }, index) => {
        const commonProps = {
          key: index,
          ref: (button: HTMLButtonElement) => (buttonRefs.current[index] = button),
          fullWidth: true,
          className: styles.button,
          size: 'm' as const,
        };

        const addTooltip = (component: ReactNode) =>
          tooltip ? <Tooltip {...tooltip}>{component}</Tooltip> : component;

        switch (variant) {
          case BUTTON_TYPE.Filled:
            return addTooltip(<ButtonFilled {...buttonProps} {...commonProps} />);
          case BUTTON_TYPE.Outline:
            return addTooltip(<ButtonOutline {...buttonProps} {...commonProps} />);
          case BUTTON_TYPE.Tonal:
            return addTooltip(<ButtonTonal {...buttonProps} {...commonProps} />);
          case BUTTON_TYPE.Function:
            return addTooltip(<ButtonFunction {...buttonProps} {...commonProps} />);
          case BUTTON_TYPE.Simple:
            return addTooltip(<ButtonSimple {...buttonProps} {...commonProps} />);
          default:
            return null;
        }
      })}

      {hiddenActions.length > 0 && (
        <MobileDropdown
          open={isOpen}
          onOpenChange={setIsOpen}
          items={hiddenActions.map(action => ({
            content: { option: action.label ?? '' },
            onClick: event => {
              setIsOpen(false);
              action.onClick?.(event);
            },
            beforeContent: action.icon,
            itemWrapRender: action.tooltip
              ? item => (
                  <Tooltip tip={action.tooltip?.tip ?? ''} {...action.tooltip}>
                    {item}
                  </Tooltip>
                )
              : undefined,
          }))}
        >
          <ButtonOutline appearance='neutral' icon={<KebabSVG />} size='m' />
        </MobileDropdown>
      )}
    </div>
  );
}
