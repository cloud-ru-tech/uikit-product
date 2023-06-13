import { resolve } from 'path';

import { hooks } from './hooks';

export const Config: Partial<TestCafeConfigurationOptions> & { hooks: unknown } = {
  src: ['packages/*/__tests__/*.ts'],
  concurrency: process.env.TEST_LOCAL ? 1 : 2,
  quarantineMode: process.env.TEST_LOCAL
    ? undefined
    : {
        successThreshold: 3,
        attemptLimit: 5,
      },
  debugOnFail: process.env.TEST_LOCAL ? true : undefined,
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
  selectorTimeout: 10000,
  assertionTimeout: 10000,
  pageLoadTimeout: 20000,
  pageRequestTimeout: 500_000,
  hooks: hooks,
};
