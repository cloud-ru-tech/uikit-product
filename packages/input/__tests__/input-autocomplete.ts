import { fixture } from 'testcafe';

import { getTestcafeUrl } from '../../../testcafe/utils';
import { runCommonTests } from './utils';

fixture('[Input Autocomplete]:');

const testId = 'inputAutocomplete-test';

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'input',
    name: 'autocomplete',
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
      onSelect: () => {},
      options: [],
    }),
  testId,
  { isMasked: false },
);
