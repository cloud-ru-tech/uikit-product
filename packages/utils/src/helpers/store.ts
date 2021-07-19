import { WindowStore } from '../types';

const customWindow: WindowStore = window as WindowStore;

if (!customWindow.sbercloudUIKit) {
  customWindow.sbercloudUIKit = {};
}

export const store = customWindow.sbercloudUIKit;
