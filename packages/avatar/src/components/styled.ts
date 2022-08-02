import { styled } from '@linaria/react';
import { VFC } from 'react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { AvatarProps, Colors, SIZES_IN_PX, Shapes, Sizes } from '../helpers';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const styledAvatar = (Badge: VFC<AvatarProps>): VFC<AvatarProps> => styled(Badge)`
  box-sizing: border-box;
  border-radius: 100%;
  color: var(${COLORS.text});
  line-height: 1;
  position: relative;

  &[data-clickable] {
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(${COLORS.hover});
      opacity: 0;
      transition: opacity ${ANIMATIONS.TRANSITION};
      z-index: 3;
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &[data-size=${Sizes.ExtraSmall}] {
    width: ${SIZES_IN_PX[Sizes.ExtraSmall].size};
    height: ${SIZES_IN_PX[Sizes.ExtraSmall].size};
    font-size: ${SIZES_IN_PX[Sizes.ExtraSmall].fontSize};

    &[data-shape=${Shapes.Square}] {
      border-radius: ${SIZES_IN_PX[Sizes.ExtraSmall].borderRadius};
    }
  }

  &[data-size=${Sizes.Small}] {
    width: ${SIZES_IN_PX[Sizes.Small].size};
    height: ${SIZES_IN_PX[Sizes.Small].size};
    font-size: ${SIZES_IN_PX[Sizes.Small].fontSize};

    &[data-shape=${Shapes.Square}] {
      border-radius: ${SIZES_IN_PX[Sizes.Small].borderRadius};
    }
  }

  &[data-size=${Sizes.Medium}] {
    width: ${SIZES_IN_PX[Sizes.Medium].size};
    height: ${SIZES_IN_PX[Sizes.Medium].size};
    font-size: ${SIZES_IN_PX[Sizes.Medium].fontSize};

    &[data-shape=${Shapes.Square}] {
      border-radius: ${SIZES_IN_PX[Sizes.Medium].borderRadius};
    }
  }

  &[data-size=${Sizes.Large}] {
    width: ${SIZES_IN_PX[Sizes.Large].size};
    height: ${SIZES_IN_PX[Sizes.Large].size};
    font-size: ${SIZES_IN_PX[Sizes.Large].fontSize};

    &[data-shape=${Shapes.Square}] {
      border-radius: ${SIZES_IN_PX[Sizes.Large].borderRadius};
    }
  }

  &[data-size=${Sizes.ExtraLarge}] {
    width: ${SIZES_IN_PX[Sizes.ExtraLarge].size};
    height: ${SIZES_IN_PX[Sizes.ExtraLarge].size};
    font-size: ${SIZES_IN_PX[Sizes.ExtraLarge].fontSize};

    &[data-shape=${Shapes.Square}] {
      border-radius: ${SIZES_IN_PX[Sizes.ExtraLarge].borderRadius};
    }
  }

  &[data-size=${Sizes.ExtraExtraLarge}] {
    width: ${SIZES_IN_PX[Sizes.ExtraExtraLarge].size};
    height: ${SIZES_IN_PX[Sizes.ExtraExtraLarge].size};
    font-size: ${SIZES_IN_PX[Sizes.ExtraExtraLarge].fontSize};

    &[data-shape=${Shapes.Square}] {
      border-radius: ${SIZES_IN_PX[Sizes.ExtraExtraLarge].borderRadius};
    }
  }

  &[data-color=${Colors.Red}] {
    background-color: var(${COLORS.background.red});
  }

  &[data-color=${Colors.Pink}] {
    background-color: var(${COLORS.background.pink});
  }

  &[data-color=${Colors.Violet}] {
    background-color: var(${COLORS.background.violet});
  }

  &[data-color=${Colors.Blue}] {
    background-color: var(${COLORS.background.blue});
  }

  &[data-color=${Colors.Green}] {
    background-color: var(${COLORS.background.green});
  }

  &[data-color=${Colors.Yellow}] {
    background-color: var(${COLORS.background.yellow});
  }

  &[data-color=${Colors.Orange}] {
    background-color: var(${COLORS.background.orange});
  }

  &[data-color=${Colors.Brown}] {
    background-color: var(${COLORS.background.brown});
  }

  &[data-color=${Colors.SilverGray}] {
    background-color: var(${COLORS.background.silver_gray});
  }

  &[data-color=${Colors.Grass}] {
    background-color: var(${COLORS.background.grass});
  }

  &[data-color=${Colors.Seamount}] {
    background-color: var(${COLORS.background.seamount});
  }
`;

export const AvatarImage = styled.div<{ backgroundImage?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  border-radius: inherit;
  background-size: cover;
  background-position: center;
  background-image: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};
`;

export const AvatarInner = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: inherit;
`;

export const AvatarContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: var(${COLORS.icon});
    height: 100% !important;
    width: auto !important;
  }
`;

export const StatusDotWrap = styled.div`
  position: absolute;
  z-index: 4;
  bottom: 0;
  right: 0;
  font-size: 0; // to reduce div height

  &[data-avatar-shape=${Shapes.Round}] {
    &[data-avatar-size=${Sizes.Medium}],
    &[data-avatar-size=${Sizes.Large}],
    &[data-avatar-size=${Sizes.ExtraLarge}] {
      bottom: 2px;
      right: 2px;
    }

    &[data-avatar-size=${Sizes.ExtraExtraLarge}] {
      bottom: 6px;
      right: 6px;
    }
  }
`;
