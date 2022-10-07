import { ClientFunction, fixture, Selector, test } from 'testcafe';

import { LinkProps } from '@sbercloud/uikit-product-link';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'link-test';
function getPage(props?: Partial<LinkProps>) {
  return getTestcafeUrl({
    name: 'link',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Link');
const getLocation = ClientFunction(() => window.location.href);

test.page(getPage({ text: 'Click' }))('With text', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).textContent).eql('Click');
});

test.page(getPage({ showSuffixIcon: true }))('Suffix icon shown', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).find(dataTestIdSelector('link__suffix-icon')).exists).ok();
});

test.page(getPage({ showSuffixIcon: false }))('Suffix icon not shown', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).find(dataTestIdSelector('link__suffix-icon')).exists).notOk();
});

test.page(getPage({ prefixIcon: undefined }))('Prefix icon not shown', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).find(dataTestIdSelector('link__prefix-icon')).exists).notOk();
});

test.page(getPage({ disabled: true, target: '_self' }))('Disabled click has no result', async t => {
  const initialLocation = await getLocation();

  await t.click(Selector(dataTestIdSelector(TEST_ID)));
  const resultLocation = await getLocation();

  await t.expect(initialLocation).eql(resultLocation);
});

test.page(getPage({ target: '_self' }))('Click has result', async t => {
  const initialLocation = await getLocation();

  await t.click(Selector(dataTestIdSelector(TEST_ID)));

  const resultLocation = await getLocation();
  await t.expect(initialLocation).notEql(resultLocation);
});
