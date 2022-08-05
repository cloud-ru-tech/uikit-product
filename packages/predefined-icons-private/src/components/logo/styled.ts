import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

type WrapperProps = {
  height: number;
};

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.span<WrapperProps>`
  display: inline-flex;
  height: ${props => props.height}px;

  .${'ml-space-logo-text'} {
    fill: var(${COLORS.fill.icon.MLSpaceText});
  }

  .${'ml-space-logo-abbr'} {
    fill: var(${COLORS.fill.icon.MLSpaceAbbr});
  }

  .${'sbercloud-logo-text'} {
    fill: var(${COLORS.fill.icon.SberCloudText});
  }

  .${'sbercloud-logo-prefix-icon'} {
    fill: var(${COLORS.fill.icon.SberCloudIcon});
  }

  .${'cloud-logo-text'} {
    fill: var(${COLORS.fill.icon.CloudText});
  }

  .${'cloud-logo-icon'} {
    fill: var(${COLORS.fill.icon.CloudIcon});
  }
`;
