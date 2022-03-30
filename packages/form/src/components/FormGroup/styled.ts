import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H3_STYLES, TABLE_TEXT_STYLES } from '@sbercloud/uikit-typography';

const { COLORS_FORM_GROUP } = DEPRECATED_EXPORT_VARS;

export const hintClassName = css`
  fill: var(${COLORS_FORM_GROUP.HINT_COLOR});
`;

export const tooltipTriggerClassName = css`
  display: inline-flex;
  margin-left: 8px;
`;

export const Wrapper = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const Number = styled.span`
  ${TABLE_TEXT_STYLES};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(${COLORS_FORM_GROUP.NUMBER_COLOR});
  background-color: var(${COLORS_FORM_GROUP.NUMBER_BG});
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 16px;
`;

export const Title = styled.h3`
  ${H3_STYLES};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;
