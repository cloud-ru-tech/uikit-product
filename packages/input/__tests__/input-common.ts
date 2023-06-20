import { fixture } from 'testcafe';

import { getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests } from './utils';

fixture('[Input Common]:');

const testId = 'inputCommon-test';

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'input',
    name: 'common',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });

runCommonTests(
  props =>
    visit({
      ...props,
      onChange: () => {},
    }),
  testId,
  { isMasked: false },
);
