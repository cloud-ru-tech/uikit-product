import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
//TODO
fixture.skip('Tag Row').page(
  getTestcafeUrl({
    name: 'tag-row',
    group: 'tag',
    props: {
      'data-test-id': 'tag-row-test',
    },
  }),
);

test('Tag Cloud Renders', async t => {
  await t.hover(Selector(dataTestIdSelector('tag-cloud-trigger')));

  await t.expect(Selector(dataTestIdSelector('tag-cloud')).exists).ok();
})
  .before(async t => await t.resizeWindow(320, 568))
  .after(async t => await t.resizeWindow(1200, 1200));
