import { DEFAULT } from '../../constants/environment';
import { WindowStore } from '../../types';

export function getCustomStore(
  defaultStore: Partial<WindowStore['sbercloudUIKit']> = {},
): WindowStore['sbercloudUIKit'] {
  const customWindow: WindowStore = globalThis as WindowStore & { sbercloudUIKit: null };

  if (!customWindow.sbercloudUIKit) {
    customWindow.sbercloudUIKit = {
      brand: DEFAULT.BRAND,
      theme: DEFAULT.THEME,
      languageCode: DEFAULT.LANGUAGE,
      ...defaultStore,
    };
  }

  return customWindow.sbercloudUIKit;
}
