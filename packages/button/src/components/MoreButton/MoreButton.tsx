import { css } from '@linaria/core';
import { MoreSVG } from '@sbercloud/icons';
import {
  BasicTooltip,
  IBasicTooltipProps,
  Tooltip,
  TooltipMenu,
  TooltipMenuItem,
  TooltipStateContainer,
} from '@sbercloud/uikit-react-tooltip';
import React from 'react';

import { Button } from '../Default';

const Placements = BasicTooltip.placements;

export type MoreButtonProps = {
  className?: string;
  placement?: IBasicTooltipProps['placement'];
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
    <TooltipStateContainer>
      {({ on, hide, toggle }: { on: boolean; hide(): void; toggle(): void }): React.ReactNode => (
        <div role='presentation' onClick={e => e?.stopPropagation()}>
          <Tooltip
            clickOutside
            closeOnReferenceHidden
            hideArrow
            placement={placement}
            trigger='click'
            tooltipShown={on}
            onVisibilityChange={toggle}
            tooltip={
              <TooltipMenu>
                {actions.map(menuItem => {
                  const handlerOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
                    event?.stopPropagation();
                    menuItem.onClick(event);
                    hide();
                  };
                  return (
                    <TooltipMenuItem key={`menu-item-${menuItem.name}`} onClick={handlerOnClick}>
                      {menuItem.name}
                    </TooltipMenuItem>
                  );
                })}
              </TooltipMenu>
            }
          >
            <Button id='more-button' variant={Button.variants.TableMenu} className={className}>
              <MoreSVG id='more-button' className={iconStyle} />
            </Button>
          </Tooltip>
        </div>
      )}
    </TooltipStateContainer>
  );
}

MoreButton.placements = Placements;
