import { LoadingWheelInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { infiniteRotateClassName } from '../helpers';

export const LoadingIcon = (props: unknown) => (
  <LoadingWheelInterfaceSVG className={infiniteRotateClassName} {...props} />
);
