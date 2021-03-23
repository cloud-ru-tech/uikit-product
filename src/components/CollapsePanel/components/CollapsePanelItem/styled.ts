import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_COLLAPSE_PANEL } from 'theme/color/vars';

export const ContainerStyled = styled.div<{ showHover?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: var(${COLORS_COLLAPSE_PANEL.COLLAPSE_PANEL_BACKGROUND});
  padding: 20px 20px 0 20px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ showHover }) => {
      if (showHover) {
        return `var(
          ${COLORS_COLLAPSE_PANEL.COLLAPSE_PANEL_BACKGROUND_HOVER}
        )`;
      }

      return `var(${COLORS_COLLAPSE_PANEL.COLLAPSE_PANEL_BACKGROUND})`;
    }};
  }
`;

export const HeaderStyled = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;

export const HeaderGroupStyled = styled.div`
  display: flex;
  &[data-clicked='true'] {
    cursor: pointer;
  }
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

export const CollapseButtonStyled = styled.button`
  min-width: 20px;
  min-height: 20px;
  height: 20px;
  display: flex;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &[data-rotate='true'] {
    transform: rotate(0.5turn);
  }
`;

export const collapseIconClassName = css`
  fill: black;
  stroke: black;
`;

export const ContentWrapStyled = styled.div`
  &[data-collapsed='true'] {
    max-height: 0;
    transition: max-height 0.2s ease-out;
    overflow: hidden;
  }

  &[data-expanded='true'] {
    max-height: 500px;
  }

  &[data-expanded-animation='true'] {
    transition: max-height 0.5s ease-in;
    overflow: hidden;
  }
`;

export const ContentStyled = styled.div`
  padding-bottom: 20px;
`;

export const favouriteButtonClassName = css`
  cursor: pointer;
  fill: var(${COLORS_COLLAPSE_PANEL.COLLAPSE_PANEL_FAVOURITE_ICON_COLOR});

  transition: all 0.2s ease-in-out;
  &:hover {
    fill: var(
      ${COLORS_COLLAPSE_PANEL.COLLAPSE_PANEL_FAVOURITE_ICON_HOVER_COLOR}
    );
  }
  &[data-filled='true'] {
    fill: var(
      ${COLORS_COLLAPSE_PANEL.COLLAPSE_PANEL_FAVOURITE_ICON_FILLED_COLOR}
    );
  }
`;
