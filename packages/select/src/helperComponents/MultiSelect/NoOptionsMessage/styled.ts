import { styled } from '@linaria/react';

import { CircleCancelFilledInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { INFO_BOX_SIZE } from '../../../constants';

export const ErrorBox = styled.div`
  height: ${INFO_BOX_SIZE}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

export const CircleCancelFilledInterfaceSVGStyled = styled(CircleCancelFilledInterfaceSVG)`
  fill: var(${EXPORT_VARS.BLACK_ALFA[24]});
`;

export const Text2Grey = styled.div`
  ${TEXT_2_STYLES};
  color: var(${EXPORT_VARS.BLACK_ALFA[48]});
`;
