import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_AVATAR } = DEPRECATED_EXPORT_VARS;

export const Avatar = styled.div<{ backgroundImage?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})` || 'none'};
  color: var(${COLORS_AVATAR.TEXT_COLOR});

  &[data-size='xs'] {
    width: 20px;
    height: 20px;
    font-size: 9px;

    &[data-shape='square'] {
      border-radius: 4px;
    }
  }

  &[data-size='s'] {
    width: 40px;
    height: 40px;
    font-size: 18px;

    &[data-shape='square'] {
      border-radius: 8px;
    }
  }

  &[data-size='m'] {
    width: 60px;
    height: 60px;
    font-size: 27px;

    &[data-shape='square'] {
      border-radius: 12px;
    }
  }

  &[data-size='l'] {
    width: 88px;
    height: 88px;
    font-size: 39.6px;

    &[data-shape='square'] {
      border-radius: 16px;
    }
  }

  &[data-size='xl'] {
    width: 120px;
    height: 120px;
    font-size: 54px;

    &[data-shape='square'] {
      border-radius: 20px;
    }
  }

  &[data-color='green'] {
    background-color: var(${COLORS_AVATAR.BG_GREEN});
  }

  &[data-color='blue'] {
    background-color: var(${COLORS_AVATAR.BG_BLUE});
  }

  &[data-color='purple'] {
    background-color: var(${COLORS_AVATAR.BG_PURPLE});
  }

  &[data-color='pink'] {
    background-color: var(${COLORS_AVATAR.BG_PINK});
  }

  &[data-color='red'] {
    background-color: var(${COLORS_AVATAR.BG_RED});
  }

  &[data-color='default-gray'] {
    background-color: var(${COLORS_AVATAR.BG_GRAY_DEFAULT});
  }

  &[data-color='gray'] {
    background-color: var(${COLORS_AVATAR.BG_GRAY});
  }

  &[data-color='brown'] {
    background-color: var(${COLORS_AVATAR.BG_BROWN});
  }

  &[data-color='orange'] {
    background-color: var(${COLORS_AVATAR.BG_ORANGE});
  }

  &[data-color='yellow'] {
    background-color: var(${COLORS_AVATAR.BG_YELLOW});
  }

  &[data-color='yellow-green'] {
    background-color: var(${COLORS_AVATAR.BG_YELLOW_GREEN});
  }

  &[data-color='blue-green'] {
    background-color: var(${COLORS_AVATAR.BG_BLUE_GREEN});
  }
`;
