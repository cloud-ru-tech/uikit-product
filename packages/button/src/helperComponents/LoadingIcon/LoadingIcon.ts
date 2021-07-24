import { styled } from '@linaria/react';
import { LoadingWheelInterfaceSVG } from '@sbercloud/uikit-react-icons';

export const LoadingIcon = styled(LoadingWheelInterfaceSVG)`
  animation: rotating 2s linear infinite;

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
