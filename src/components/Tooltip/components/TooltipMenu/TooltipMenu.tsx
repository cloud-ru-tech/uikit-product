import React, { FC, memo } from 'react';
import { Ref } from 'react-popper-tooltip';
import { styled } from '@linaria/react';
import { COLORS_TOOLTIP } from 'theme/color/vars';

export type TooltipMenuItemProps = {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

type TTooltipWrapper = { disabled?: boolean };

const TooltipWrapper = styled.div<TTooltipWrapper>`
  gap: 10px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#6c6c6c' : 'inherit')};
  padding: 0 12px;
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? 'inherit' : `var(${COLORS_TOOLTIP.MENU_ITEM_HOVER_BG})`};
  }
`;

const Container = styled.nav`
  background-color: var(${COLORS_TOOLTIP.MENU_BG});
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

const ContainerItem = styled.ul`
  padding: 4px 0;
  margin: 0;
`;

export const TooltipMenuItem: FC<TooltipMenuItemProps> = memo(
  function TooltipMenuItem(props) {
    const { children, ...overProps } = props;
    return <TooltipWrapper {...overProps}>{children}</TooltipWrapper>;
  },
);

export type TooltipMenuProps = {
  tooltipRef?: Ref;
  className?: string;
};
export const TooltipMenu: FC<TooltipMenuProps> = memo(function TooltipMenu(
  props,
) {
  const { children, tooltipRef, className, ...overProps } = props;
  return (
    <Container className={className} {...overProps}>
      <ContainerItem>{children}</ContainerItem>
    </Container>
  );
});
