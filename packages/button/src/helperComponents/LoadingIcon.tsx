import { LoadingWheelInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { loadingWheelClassName } from '../helpers';

export const LoadingIcon = (props: unknown) => (
  <LoadingWheelInterfaceSVG className={loadingWheelClassName} {...props} />
);
