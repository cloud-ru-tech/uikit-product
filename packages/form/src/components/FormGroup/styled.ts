import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H3, TableText } from '@sbercloud/uikit-typography';

import { VARIANT } from './FormGroup';

const { COLORS_DIVIDER, COLORS_FORM_GROUP } = DEPRECATED_EXPORT_VARS;

export const hintClassName = css`
  fill: var(${COLORS_FORM_GROUP.HINT_COLOR});

  margin-left: 8px;
`;

export const tooltipTriggerClassName = css`
  display: inline-flex;
`;

export const Wrapper = styled.div`
  padding: 24px 0;

  &[data-variant='${VARIANT.POPUP}'] {
    padding: 24px;

    &:not(:last-child) {
      border-bottom: 1px solid var(${COLORS_DIVIDER.COLOR_MIDDLE});
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Number = styled(TableText)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(${COLORS_FORM_GROUP.NUMBER_COLOR});
  background-color: var(${COLORS_FORM_GROUP.NUMBER_BG});
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const Title = styled(H3)`
  margin-left: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-top: 24px;
  }
`;
