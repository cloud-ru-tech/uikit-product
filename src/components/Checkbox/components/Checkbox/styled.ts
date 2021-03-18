import { styled } from '@linaria/react';

import { COLORS_CHECKBOX } from 'theme/color/vars';

export const StyledCheckboxWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &[data-selected='false'] {
    cursor: pointer;

    & > svg {
      fill: var(${COLORS_CHECKBOX.CHECKBOX_COLOR});
      :hover {
        fill: var(${COLORS_CHECKBOX.CHECKBOX_HOVER_COLOR});
      }
    }

    &[data-disabled='true'] > svg {
      cursor: not-allowed;
      fill: var(${COLORS_CHECKBOX.CHECKBOX_DISABLED_COLOR});
    }
  }

  &[data-selected='true'] {
    cursor: pointer;

    & > svg {
      fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_COLOR});
      &:hover {
        fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_HOVER_COLOR});
      }
    }

    &[data-disabled='true'] > svg {
      cursor: not-allowed;
      fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
    }

    &[data-disabled='true'] > svg > path {
      cursor: not-allowed;
      fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
    }
  }
`;
