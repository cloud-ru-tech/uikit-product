import { styled } from '@linaria/react';
import { VFC } from 'react';

import { SizeInPx, Sizes, Types } from '../../helpers';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { StatusDotProps } from './types';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const styledStatusDot = (StatusDot: VFC<StatusDotProps>): VFC<StatusDotProps> => styled(StatusDot)`
  border-radius: 100%;
  position: relative;
  display: inline-block;

  &:after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    border-color: var(${COLORS.BORDER_COLOR});
    border-style: solid;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  &[data-size=${Sizes.ExtraSmall}] {
    min-width: ${SizeInPx[Sizes.ExtraSmall].size};
    max-width: ${SizeInPx[Sizes.ExtraSmall].size};
    width: ${SizeInPx[Sizes.ExtraSmall].size};
    height: ${SizeInPx[Sizes.ExtraSmall].size};

    &:after {
      border-width: ${SizeInPx[Sizes.ExtraSmall].border};
    }
  }

  &[data-size=${Sizes.Small}] {
    min-width: ${SizeInPx[Sizes.Small].size};
    max-width: ${SizeInPx[Sizes.Small].size};
    width: ${SizeInPx[Sizes.Small].size};
    height: ${SizeInPx[Sizes.Small].size};

    &:after {
      border-width: ${SizeInPx[Sizes.Small].border};
    }
  }

  &[data-size=${Sizes.Medium}] {
    min-width: ${SizeInPx[Sizes.Medium].size};
    max-width: ${SizeInPx[Sizes.Medium].size};
    width: ${SizeInPx[Sizes.Medium].size};
    height: ${SizeInPx[Sizes.Medium].size};

    &:after {
      border-width: ${SizeInPx[Sizes.Medium].border};
    }
  }

  &[data-size=${Sizes.Large}] {
    min-width: ${SizeInPx[Sizes.Large].size};
    max-width: ${SizeInPx[Sizes.Large].size};
    width: ${SizeInPx[Sizes.Large].size};
    height: ${SizeInPx[Sizes.Large].size};

    &:after {
      border-width: ${SizeInPx[Sizes.Large].border};
    }
  }

  &[data-size=${Sizes.ExtraLarge}] {
    min-width: ${SizeInPx[Sizes.ExtraLarge].size};
    max-width: ${SizeInPx[Sizes.ExtraLarge].size};
    width: ${SizeInPx[Sizes.ExtraLarge].size};
    height: ${SizeInPx[Sizes.ExtraLarge].size};

    &:after {
      border-width: ${SizeInPx[Sizes.ExtraLarge].border};
    }
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
