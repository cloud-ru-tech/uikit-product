import { css } from '@linaria/core';
import { MoreSVG } from '@sbercloud/icons';
import React from 'react';

import { Button } from 'components/Button';
import { Tooltip, TooltipMenu } from 'components/Tooltip';
import { TooltipMenuItem } from 'components/Tooltip/helperComponents/TooltipMenuItem';
import { TooltipStateContainer } from 'components/Tooltip/helperComponents/TooltipStateContainer';

export interface IMoreButtonProps {
  className?: string;
  actions: {
    name: React.ReactNode;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
}

const iconStyle = css`
  cursor: pointer;
  width: 100%;
`;

export const MoreButton: React.FC<IMoreButtonProps> = ({
  actions,
  className,
}) => (
  <TooltipStateContainer>
    {({
      on,
      hide,
      toggle,
    }: {
      on: boolean;
      hide(): void;
      toggle(): void;
    }): React.ReactNode => (
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
              const handlerOnClick = (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>,
              ): void => {
                event?.stopPropagation();
                menuItem.onClick(event);
                hide();
              };
              return (
                <TooltipMenuItem
                  key={`menu-item-${menuItem.name}`}
                  onClick={handlerOnClick}
                >
                  {menuItem.name}
                </TooltipMenuItem>
              );
            })}
          </TooltipMenu>
        }
      >
        <Button
          id='more-button'
          variant={Button.variants.tableMenu}
          className={className}
        >
          <MoreSVG className={iconStyle} />
        </Button>
      </Tooltip>
    )}
  </TooltipStateContainer>
);
