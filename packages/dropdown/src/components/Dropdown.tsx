import { cx } from '@linaria/core';
import { useCallback, useState } from 'react';

import {
  TooltipMenuItemPrivate,
  TooltipMenuItemPrivateProps,
  TooltipMenuPrivate,
  TooltipPrivate,
} from '@sbercloud/uikit-react-tooltip-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import * as S from './styled';

export type TDropdownMenuActionType = {
  name: () => React.ReactNode | string;
  id?: string;
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

export type TDropdownMenuActionProps = {
  on: boolean;
  set(on: boolean): void;
  hide(): void;
};
export type TDropdownMenuCustomActions = (props: TDropdownMenuActionProps) => React.ReactNode;

export interface DropdownMenuProps {
  actions: TDropdownMenuCustomActions | TDropdownMenuActionType[] | React.ReactNode;
  children: React.ReactNode;
  dropdownMenuClassName?: string;
  onToggle?: (isOpen: boolean) => void;
}

export const DropdownItem: React.FC<TooltipMenuItemPrivateProps> = props => (
  <TooltipMenuItemPrivate className={S.menuItemClassName} {...props} />
);

export const DropdownMenu = ({
  actions,
  children,
  onToggle,
  dropdownMenuClassName,
  ...rest
}: WithSupportProps<DropdownMenuProps>) => {
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
      placement={TooltipPrivate.placements.BottomEnd}
      trigger={TooltipPrivate.triggerTypes.Click}
      visible={on}
      onVisibleChange={toggleDropdown}
      classNameContainer={S.containerClassName}
      offset={[0, 12]}
      delayShow={0}
      delayHide={0}
      tooltip={
        <TooltipMenuPrivate
          data-test-id='dropdown__tooltip-menu'
          className={cx(S.menuClassName, dropdownMenuClassName)}
        >
          {isActionsArray &&
            (actions as TDropdownMenuActionType[]).map((menuItem, index) => {
              const { name, id } = menuItem;
              const isNameFn = typeof name === 'function';
              const handlerOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
                event?.stopPropagation();
                menuItem.onClick(event);
                closeDropdown();
              };

              return (
                <TooltipMenuItemPrivate
                  data-test-option-index={index}
                  key={`menu-item-${menuItem.name}`}
                  onClick={handlerOnClick}
                  className={S.menuItemClassName}
                  {...(id ? { 'data-test-option-id': id } : {})}
                >
                  {isNameFn ? name() : name}
                </TooltipMenuItemPrivate>
              );
            })}
          {isActionsFn && (actions as TDropdownMenuCustomActions)({ on, set: toggleDropdown, hide: closeDropdown })}
          {!isActionsArray && !isActionsFn && actions}
        </TooltipMenuPrivate>
      }
    >
      <S.Wrapper {...extractSupportProps(rest)}>{children}</S.Wrapper>
    </TooltipPrivate>
  );
};
