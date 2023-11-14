import { cx } from '@linaria/core';
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Divider } from '@sbercloud/uikit-product-divider';
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
  withTopDivider?: boolean;
  withBottomDivider?: boolean;
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
  open?: boolean;
  onToggle?: (isOpen: boolean) => void;
  value?: string;
  onChange?: (value: string) => void;
  closeOnOutsideClick?: boolean;
  closeOnMenuClick?: boolean;
}>;

export function DropdownItem(props: TooltipMenuItemPrivateProps) {
  return <TooltipMenuItemPrivate className={S.menuItemClassName} {...props} />;
}

export function DropdownMenu({
  actions,
  children,
  open: openProp,
  onToggle,
  dropdownMenuClassName,
  value,
  onChange,
  closeOnOutsideClick = true,
  closeOnMenuClick = true,
  placement = TooltipPrivate.placements.BottomEnd,
  ...rest
}: DropdownMenuProps) {
  const [open, toggleDropdown] = useUncontrolledProp(openProp, false, onToggle);

  const closeDropdown = useCallback(() => {
    toggleDropdown(false);
  }, [toggleDropdown]);

  const isActionsArray = Array.isArray(actions);
  const isActionsFn = !isActionsArray && typeof actions === 'function';

  return (
    <TooltipPrivate
      placement={placement}
      trigger={TooltipPrivate.triggerTypes.Click}
      interactive={false}
      visible={open}
      onVisibleChange={toggleDropdown}
      classNameContainer={S.containerClassName}
      offset={[0, 12]}
      delayShow={0}
      delayHide={0}
      closeOnOutsideClick={closeOnOutsideClick}
      tooltip={
        <TooltipMenuPrivate
          data-test-id='dropdown__tooltip-menu'
          className={cx(S.menuClassName, dropdownMenuClassName)}
        >
          {isActionsArray &&
            (actions as TDropdownMenuActionType[]).map((menuItem, index) => {
              const { label, disabled, withTopDivider, withBottomDivider } = menuItem;
              const isNameFn = typeof label === 'function';
              const handlerOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
                if (disabled) return;
                event?.stopPropagation();
                menuItem.onClick?.(event);
                onChange?.(menuItem.value);
                closeDropdown();
              };

              return (
                <Fragment key={`menu-item-${menuItem.value}`}>
                  {withTopDivider && <Divider variant={Divider.variants.Secondary} />}
                  <TooltipMenuItemPrivate
                    data-test-option-index={index}
                    onClick={handlerOnClick}
                    data-disabled={disabled || undefined}
                    data-selected={menuItem.value === value || undefined}
                    className={S.menuItemClassName}
                    data-test-option-id={menuItem.value}
                  >
                    {isNameFn ? label() : label}
                  </TooltipMenuItemPrivate>
                  {withBottomDivider && <Divider variant={Divider.variants.Secondary} />}
                </Fragment>
              );
            })}
          {isActionsFn &&
            (actions as TDropdownMenuCustomActions)({
              on: open,
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
