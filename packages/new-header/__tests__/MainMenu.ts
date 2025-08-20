import { fixture } from 'testcafe';

import { getTestcafeUrl } from '../../../testcafe/utils';
import { basic } from './basic';
import { HEADER_TEST_ID } from './constants';
import { searchTests } from './search';

function getPage(props: Record<string, unknown> = {}) {
  return getTestcafeUrl({
    category: 'console',
    name: 'header-main-menu',
    story: 'main-menu',
    globals: { brand: 'Cloud', locale: 'en-GB' },
    props: { ...props, 'data-test-id': HEADER_TEST_ID },
  });
}

fixture('Product Header Main Menu').page(getPage());

basic(getPage);
searchTests();
