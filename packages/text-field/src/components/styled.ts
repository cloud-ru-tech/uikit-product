import { styled } from '@linaria/react';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  width: 100%;
  border-radius: 4px;
  padding: 8px 8px 8px 12px;
  box-sizing: border-box;
  background-color: var(${COLORS.BACKGROUND_COLOR});
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  ${TYPOGRAPHY_VARIABLES.TEXT_2}
`;

export const StyledText = styled.span`
  margin: 4px 8px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  color: var(${COLORS.COLOR});
  white-space: nowrap;

  &[data-multiline] {
    white-space: pre-wrap;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  float: right;

  > * {
    margin-bottom: 0;
    margin-left: 4px;
  }

  &[data-multiline] {
    justify-content: flex-end;
    flex-direction: column-reverse;
    > * {
      margin-bottom: 4px;
      margin-left: 0;
    }
  }
`;
