import { resolve } from 'path';

import { hooks } from './hooks';

export const Config: Partial<TestCafeConfigurationOptions> & { hooks: any } = {
  src: ['packages/*/__tests__/*.ts'],
  concurrency: 2,
  quarantineMode: {
    successThreshold: 3,
    attemptLimit: 5,
  },
  reporter: [
    {
      name: 'xunit',
      output: resolve(__dirname, 'reports/report.xml'),
    },
    {
      name: 'spec',
    },
  ],
  screenshots: {
    path: resolve(__dirname, 'screenshots'),
    pathPattern: '${FIXTURE}-${TEST}-${USERAGENT}/${RUN_ID}.png',
    takeOnFails: true,
  },
  videoPath: resolve(__dirname, 'videos'),
  videoOptions: {
    failedOnly: true,
    pathPattern: '${FIXTURE}-${TEST}-${USERAGENT}/${RUN_ID}.mp4',
  },
  selectorTimeout: 10000,
  assertionTimeout: 10000,
  pageLoadTimeout: 20000,
  pageRequestTimeout: 20000,
  hooks: hooks,
};
