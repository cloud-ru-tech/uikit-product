import { styled } from '@linaria/react';

import { Types } from '../../helpers';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Dot = styled.span`
  min-width: 8px;
  max-width: 8px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  position: relative;
  display: inline-block;

  &:before,
  &:after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
  }

  &:before {
    width: 11px;
    height: 11px;
    background-color: var(${COLORS.STATUS_BADGE_BORDER_COLOR});
    z-index: 1;
  }

  &:after {
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  &[data-type='${Types.Failed}']:after {
    background-color: var(${COLORS.FAILED_BG});
  }

  &[data-type='${Types.Success}']:after {
    background-color: var(${COLORS.SUCCESS_BG});
  }

  &[data-type='${Types.Warning}']:after {
    background-color: var(${COLORS.WARNING_BG});
  }

  &[data-type='${Types.Unactive}']:after {
    background-color: var(${COLORS.UNACTIVE_BG});
  }

  &[data-type='${Types.Progress}']:after {
    background-color: var(${COLORS.PROGRESS_BG});
  }

  &[data-type='${Types.Neutral}']:after {
    background-color: var(${COLORS.NEUTRAL_BG});
  }
`;
