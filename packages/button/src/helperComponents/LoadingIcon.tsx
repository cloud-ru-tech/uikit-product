import { loadingWheelClassName } from '@sbercloud/uikit-react-button-private';
import { LoadingWheelInterfaceSVG } from '@sbercloud/uikit-react-icons';

export const LoadingIcon = (props: unknown) => (
  <LoadingWheelInterfaceSVG className={loadingWheelClassName} {...props} />
);
