import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { COLORS_DIVIDER, COLORS_FORM_GROUP } from 'theme/color/vars';
import { H3, TableText } from 'typography';

import { VARIANT } from './FormGroup';

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
  display: grid;
  grid-row-gap: 24px;
  margin-top: 24px;
`;
