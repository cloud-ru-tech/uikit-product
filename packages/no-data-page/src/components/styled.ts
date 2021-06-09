import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H3 } from '@sbercloud/uikit-typography';

const { COLORS_NO_DATA_PAGE } = EXPORT_VARS;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  align-items: flex-start;
  justify-content: center;

  margin-top: 80px;
`;

export const IconContainer = styled.div`
  margin-right: 48px;
`;

export const iconClassName = css`
  fill: var(${COLORS_NO_DATA_PAGE.ICON_FILL});
`;

export const Title = styled(H3)`
  color: var(${COLORS_NO_DATA_PAGE.TITLE_COLOR});
`;

export const DescContainer = styled.div`
  max-width: 540px;
  color: var(${COLORS_NO_DATA_PAGE.CONTENT_COLOR});
`;
