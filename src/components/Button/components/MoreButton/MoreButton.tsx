import { css } from '@linaria/core';
import { MoreSVG } from '@aicloud/ui-icons';

import { Button } from 'components/Button';
import { Tooltip, TooltipMenu } from 'components/Tooltip';
import { TooltipMenuItem } from 'components/Tooltip/helperComponents/TooltipMenuItem';
import { TooltipStateContainer } from 'components/Tooltip/helperComponents/TooltipStateContainer';

export interface IMoreButtonProps {
  actions: {
    name: string;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
}

const iconStyle = css`
  cursor: pointer;
  width: 100%;
`;

export const MoreButton: React.FC<IMoreButtonProps> = ({ actions }) => (
  <Button type='transparent'>
    <TooltipStateContainer>
      {({
        on,
        set,
        hide,
      }: {
        on: boolean;
        set(): void;
        hide(): void;
      }): React.ReactNode => (
        <Tooltip
          clickOutside
          closeOnReferenceHidden
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
