import {
  AttentionInterfaceSVG,
  CircleCancelFilledInterfaceSVG,
  CircleCheckFilledInterfaceSVG,
  InfoInterfaceSVG,
  LoadingWheelInterfaceSVG,
} from '@sbercloud/uikit-product-icons';

import { Icon } from '../../constants';
import { notReachable } from '../../helpers';

type PredefinedIconProps = {
  icon: Icon;
  size?: number;
};

export function PredefinedIcon({ icon, ...rest }: PredefinedIconProps) {
  switch (icon) {
    case Icon.Info:
      return <InfoInterfaceSVG {...rest} />;
    case Icon.Success:
      return <CircleCheckFilledInterfaceSVG {...rest} />;
    case Icon.AttentionCritical:
    case Icon.AttentionWarning:
      return <AttentionInterfaceSVG {...rest} />;
    case Icon.Failed:
    case Icon.Cancel:
      return <CircleCancelFilledInterfaceSVG {...rest} />;
    case Icon.Loading:
      return <LoadingWheelInterfaceSVG {...rest} />;

    default:
      return notReachable(icon);
  }
}
