import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_AVATAR } = EXPORT_VARS;

export const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(${COLORS_AVATAR.BG});
  color: var(${COLORS_AVATAR.COLOR});
  fill: var(${COLORS_AVATAR.COLOR});

  &[data-size='m'] {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }

  &[data-size='l'] {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }

  &[data-shape='circle'] {
    border-radius: 90%;
  }

  &[data-shape='square'] {
    border-radius: 4px;
  }
`;
