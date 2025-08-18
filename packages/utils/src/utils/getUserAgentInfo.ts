import { UAParser } from 'ua-parser-js';

import { ValueOf } from '@snack-uikit/utils';

const DEVICE_TYPE = {
  Console: 'console',
  Mobile: 'mobile',
  Tablet: 'tablet',
  Smarttv: 'smarttv',
  Wearable: 'wearable',
  Embedded: 'embedded',
  Desktop: 'desktop',
} as const;

const DEVICE_TYPES = Object.values(DEVICE_TYPE);

type DeviceType = ValueOf<typeof DEVICE_TYPE>;

const getDeviceType = (type: string | undefined): DeviceType =>
  DEVICE_TYPES.find(value => value === type) || DEVICE_TYPE.Desktop;

export function getUserAgentInfo() {
  const parser = new UAParser(globalThis.navigator.userAgent);
  const device = parser.getDevice();
  const browser = parser.getBrowser();
  const os = parser.getOS();

  return {
    device: {
      model: device.model,
      type: getDeviceType(device.type),
    },
    os,
    browser,
  };
}
