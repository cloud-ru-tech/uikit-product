import React from 'react';
import { css } from '@linaria/core';
import { MoreSVG } from '@aicloud/ui-icons';

import {
  TooltipStateContainer,
  TooltipMenu,
  TooltipMenuItem,
} from 'components/Tooltip';
import { Tooltip } from 'components/Tooltip';
import { Button } from '../Default';

export type TMoreButtonProps = {
  actions: {
    name: string;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
};

const iconStyle = css`
  cursor: pointer;
  width: 100%;
`;

export const MoreButton: React.FC<TMoreButtonProps> = ({ actions }) => {
  return (
    <Button type='transparent'>
      <TooltipStateContainer>
        {({
          on,
          set,
          hide,
        }: {
          on: boolean;
          set: () => void;
          hide: () => void;
        }): React.ReactNode => (
          <Tooltip
            clickOutside={true}
            closeOnReferenceHidden={true}
            hideArrow
            placement='bottom-start'
            trigger='click'
            tooltipShown={on}
            onVisibilityChange={set}
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
            <MoreSVG id='more-button' className={iconStyle} />
          </Tooltip>
        )}
      </TooltipStateContainer>
    </Button>
  );
};
