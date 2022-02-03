import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { InfoInterfaceSVG, QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { TEXT_2_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
GREEN_THEME;
PURPLE_DARK_THEME;
GREEN_DARK_THEME;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  word-break: break-word;
  white-space: break-spaces;

  &[data-header] {
    padding-bottom: 8px;
  }

  &[data-footer] {
    padding-top: 8px;
  }

  &[data-reverse] {
    justify-content: flex-end;
  }

  &[data-justify-start] {
    justify-content: flex-start;
  }

  &[data-align-center] {
    align-items: center;
  }
`;

export const OptionalMark = styled.span`
  display: contents;
  ${TEXT_3_STYLES};
  color: var(${COLORS.optional});
`;

export const Label = styled.span`
  display: contents;
  ${TEXT_2_STYLES};
  color: var(${COLORS.label});
`;

export const LabelIcon = styled(QuestionInterfaceSVG)`
  fill: var(${COLORS.labelIcon});
`;

export const LabelIconTriggerView = css`
  margin-left: 4px;
  vertical-align: sub;
`;

export const ErrorIcon = styled(InfoInterfaceSVG)`
  padding-right: 4px;
  vertical-align: middle;
  fill: var(${COLORS.error});
  min-width: 16px;
`;

export const ErrorText = styled.span`
  ${TEXT_3_STYLES};
  color: var(${COLORS.error});
`;

export const HintText = styled.span`
  ${TEXT_3_STYLES};
  color: var(${COLORS.hint});
`;

export const LengthCounter = styled.span`
  ${TEXT_3_STYLES};
  color: var(${COLORS.hint});
  margin-left: 16px;
  min-width: fit-content;
  align-self: flex-start;
`;

export const ErrorWrapper = styled.div`
  display: inline-flex;
`;
