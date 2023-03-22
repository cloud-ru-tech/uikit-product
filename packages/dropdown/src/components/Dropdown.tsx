import { cx } from '@linaria/core';
import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';

import {
  Placements,
  TooltipMenuItemPrivate,
  TooltipMenuItemPrivateProps,
  TooltipMenuPrivate,
  TooltipPrivate,
} from '@sbercloud/uikit-product-tooltip-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type TDropdownMenuActionType = {
  label: (() => ReactNode) | string;
  onClick?(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  value: string;
  disabled?: boolean;
};

export type TDropdownMenuActionProps = {
  on: boolean;
  set(on: boolean): void;
  hide(): void;
};
export type TDropdownMenuCustomActions = (props: TDropdownMenuActionProps) => ReactNode;

export type DropdownMenuProps = WithSupportProps<{
  actions: TDropdownMenuCustomActions | TDropdownMenuActionType[] | ReactNode;
  children: ReactNode;
  dropdownMenuClassName?: string;
  placement?: Placements;
  onToggle?: (isOpen: boolean) => void;
  value?: string;
  onChange?: (value: string) => void;
  closeOnMenuClick?: boolean;
}>;

export function DropdownItem(props: TooltipMenuItemPrivateProps) {
  return <TooltipMenuItemPrivate className={S.menuItemClassName} {...props} />;
}

export function DropdownMenu({
  actions,
  children,
  onToggle,
  dropdownMenuClassName,
  value,
  onChange,
  closeOnMenuClick = true,
  placement = TooltipPrivate.placements.BottomEnd,
  ...rest
}: DropdownMenuProps) {
  const [on, setOn] = useState(false);
  const toggleDropdown = useCallback(
    on => {
      setOn(on);
      if (onToggle) onToggle(on);
    },
    [onToggle],
  );
  const closeDropdown = useCallback(() => {
    setOn(false);
    if (onToggle) onToggle(false);
  }, [onToggle]);

  const isActionsArray = Array.isArray(actions);
  const isActionsFn = !isActionsArray && typeof actions === 'function';

  return (
    <TooltipPrivate
      placement={placement}
      trigger={TooltipPrivate.triggerTypes.Click}
      interactive={false}
      visible={on}
      onVisibleChange={toggleDropdown}
      classNameContainer={S.containerClassName}
      offset={[0, 12]}
      delayShow={0}
      delayHide={0}
      clickOutside
      tooltip={
        <TooltipMenuPrivate
          data-test-id='dropdown__tooltip-menu'
          className={cx(S.menuClassName, dropdownMenuClassName)}
        >
          {isActionsArray &&
            (actions as TDropdownMenuActionType[]).map((menuItem, index) => {
              const { label, disabled } = menuItem;
              const isNameFn = typeof label === 'function';
              const handlerOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
                if (disabled) return;
                event?.stopPropagation();
                menuItem.onClick?.(event);
                onChange?.(menuItem.value);
                closeDropdown();
              };

              return (
                <TooltipMenuItemPrivate
                  data-test-option-index={index}
                  key={`menu-item-${menuItem.value}`}
                  onClick={handlerOnClick}
                  data-disabled={disabled || undefined}
                  data-selected={menuItem.value === value || undefined}
                  className={S.menuItemClassName}
                  data-test-option-id={menuItem.value}
                >
                  {isNameFn ? label() : label}
                </TooltipMenuItemPrivate>
              );
            })}
          {isActionsFn &&
            (actions as TDropdownMenuCustomActions)({
              on,
              set: toggleDropdown,
              hide: closeDropdown,
            })}
          {!isActionsArray &&
            !isActionsFn &&
            isValidElement(actions) &&
            Children.map<ReactNode, ReactNode>(actions.props.children, child => {
              if (!isValidElement(child)) return child;

              type ClonnedElementProps = { onClick: () => void };

              return cloneElement(child as ReactElement<PropsWithChildren<ClonnedElementProps>>, {
                onClick: () => {
                  child.props.onClick?.();

                  if (closeOnMenuClick) {
                    closeDropdown();
                  }
                },
              });
            })}
        </TooltipMenuPrivate>
      }
    >
      <S.Wrapper {...extractSupportProps(rest)}>{children}</S.Wrapper>
    </TooltipPrivate>
  );
}

DropdownMenu.placements = Placements;
