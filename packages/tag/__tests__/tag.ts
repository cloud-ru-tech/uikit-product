import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function getPage(showRemove: boolean) {
  return getTestcafeUrl({
    name: 'tag',
    group: 'tag',
    props: {
      'data-test-id': 'tag-test',
      showRemoveButton: showRemove || undefined,
    },
  });
}

fixture('Tag');

test.page(getPage(false))('Without remove button', async t => {
  await t.expect(Selector(dataTestIdSelector('tag-test')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('tag-test')).find(dataTestIdSelector('tag-remove-button')).exists).notOk();
});

test.page(getPage(true))('With Remove button', async t => {
  await t.expect(Selector(dataTestIdSelector('tag-test')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('tag-test')).find(dataTestIdSelector('tag-remove-button')).exists).ok();
});
