import { css } from '@linaria/core';
import { MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';
import {
  TooltipMenuItemPrivate,
  TooltipMenuPrivate,
  TooltipPrivate,
  TooltipPrivateProps,
  TooltipStateContainerPrivate,
} from '@sbercloud/uikit-react-tooltip-private';
import React from 'react';

import { Button } from '../Default';

const Placements = TooltipPrivate.placements;

export type MoreButtonProps = {
  className?: string;
  placement?: TooltipPrivateProps['placement'];
  actions: {
    name: React.ReactNode;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
};

const iconStyle = css`
  cursor: pointer;
  width: 100%;
`;

export function MoreButton({ actions, className, placement = Placements.BottomEnd }: MoreButtonProps) {
  return (
    <TooltipStateContainerPrivate>
      {({ on, hide, toggle }: { on: boolean; hide(): void; toggle(): void }): React.ReactNode => (
        <div role='presentation' onClick={e => e?.stopPropagation()}>
          <TooltipPrivate
            clickOutside
            closeOnReferenceHidden
            hideArrow
            placement={placement}
            trigger='click'
            tooltipShown={on}
            onVisibilityChange={toggle}
            tooltip={
              <TooltipMenuPrivate>
                {actions.map(menuItem => {
                  const handlerOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
                    event?.stopPropagation();
                    menuItem.onClick(event);
                    hide();
                  };
                  return (
                    <TooltipMenuItemPrivate key={`menu-item-${menuItem.name}`} onClick={handlerOnClick}>
                      {menuItem.name}
                    </TooltipMenuItemPrivate>
                  );
                })}
              </TooltipMenuPrivate>
            }
          >
            <Button id='more-button' variant={Button.variants.TableMenu} className={className}>
              <MoreInterfaceSVG id='more-button' className={iconStyle} />
            </Button>
          </TooltipPrivate>
        </div>
      )}
    </TooltipStateContainerPrivate>
  );
}

MoreButton.placements = Placements;
