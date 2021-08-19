import { useCallback, useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { TooltipMenuItemPrivate, TooltipMenuPrivate, TooltipPrivate } from '@sbercloud/uikit-react-tooltip-private';

import * as S from './styled';

export type TDropdownMenuActionType = {
  name: () => React.ReactNode | string;
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
}

export const DropdownItem = TooltipMenuItemPrivate;

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ actions, children }) => {
  const [on, setOn] = useState(false);
  const set = useCallback(on => setOn(on), []);
  const hide = useCallback(() => setOn(false), []);

  const isActionsArray = Array.isArray(actions);
  const isActionsFn = !isActionsArray && typeof actions === 'function';
  return (
    <TooltipPrivate
      placement={TooltipPrivate.placements.BottomEnd}
      trigger='click'
      tooltipShown={on}
      onVisibilityChange={set}
      classNameContainer={S.containerClassName}
      modifiers={[
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 12],
          },
        },
      ]}
      delayShow={0}
      delayHide={0}
      tooltip={
        <TooltipMenuPrivate>
          {isActionsArray &&
            (actions as TDropdownMenuActionType[]).map(menuItem => {
              const { name } = menuItem;
              const isNameFn = typeof name === 'function';
              const handlerOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
                event?.stopPropagation();
                menuItem.onClick(event);
                hide();
              };
              return (
                <TooltipMenuItemPrivate key={`menu-item-${menuItem.name}`} onClick={handlerOnClick}>
                  {isNameFn ? name() : name}
                </TooltipMenuItemPrivate>
              );
            })}
          {isActionsFn && (actions as TDropdownMenuCustomActions)({ on, set, hide })}
          {!isActionsArray && !isActionsFn && actions}
        </TooltipMenuPrivate>
      }
    >
      {children || <ButtonIcon icon={<MoreInterfaceSVG />} title='Меню' />}
    </TooltipPrivate>
  );
};
