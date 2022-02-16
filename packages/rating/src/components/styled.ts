import { styled } from '@linaria/react';

import { FavouriteInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { GREY, BLACK_ALFA, PRESET } = EXPORT_VARS;

export const MarkContainer = styled.div`
  display: flex;
  column-gap: 16px;
  flex-direction: row;
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  border-radius: 100%;
  border: 1px solid var(${GREY[25]});

  &[data-disabled] {
    pointer-events: none;
  }
`;

export const FavouriteInterfaceSVGStyled = styled(FavouriteInterfaceSVG)`
  fill: var(${BLACK_ALFA[16]});

  &[data-selected] {
    fill: var(${PRESET.SUNNY_YELLOW});
  }
`;
