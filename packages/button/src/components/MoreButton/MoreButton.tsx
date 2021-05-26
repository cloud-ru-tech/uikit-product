import { css } from '@linaria/core';
import React from 'react';

import { MoreSVG } from '@sbercloud/icons';
import { Tooltip, TooltipMenu, TooltipMenuItem, TooltipStateContainer } from '@sbercloud/uikit-react-tooltip';

import { Button } from '../Default';

export type MoreButtonProps = {
  className?: string;
  actions: {
    name: React.ReactNode;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
};

const iconStyle = css`
  cursor: pointer;
  width: 100%;
`;

export const MoreButton: React.FC<MoreButtonProps> = ({ actions, className }) => (
  <TooltipStateContainer>
    {({ on, hide, toggle }: { on: boolean; hide(): void; toggle(): void }): React.ReactNode => (
      <div role='presentation' onClick={e => e?.stopPropagation()}>
        <Tooltip
          clickOutside
          closeOnReferenceHidden
          hideArrow
          placement='bottom-start'
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
