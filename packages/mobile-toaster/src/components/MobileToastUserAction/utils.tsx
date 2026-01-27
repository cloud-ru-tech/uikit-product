import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG } from '@cloud-ru/uikit-product-icons';

import { TOAST_SYSTEM_EVENT_APPEARANCE } from '../MobileToastSystemEvent/constants';
import { ToastUserActionAppearance } from './types';

export function getIcon(appearance: ToastUserActionAppearance) {
  switch (appearance) {
    case TOAST_SYSTEM_EVENT_APPEARANCE.Success:
      return <CheckFilledSVG />;
    case TOAST_SYSTEM_EVENT_APPEARANCE.Error:
      return <CrossFilledSVG />;
    case TOAST_SYSTEM_EVENT_APPEARANCE.Warning:
      return <AlarmFilledSVG />;
    case TOAST_SYSTEM_EVENT_APPEARANCE.Neutral:
    default:
      return null;
  }
}
