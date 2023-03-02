import { DEFAULT } from '../../constants';
import { WindowStore } from '../../types';

export function getCustomStore(
  defaultStore: Partial<WindowStore['sbercloudUIKit']> = {},
): WindowStore['sbercloudUIKit'] {
  const customWindow: WindowStore = window as WindowStore & { sbercloudUIKit: null };

  if (!customWindow.sbercloudUIKit) {
    customWindow.sbercloudUIKit = { theme: DEFAULT.THEME, languageCode: DEFAULT.LANGUAGE, ...defaultStore };
  }

  return customWindow.sbercloudUIKit;
}
