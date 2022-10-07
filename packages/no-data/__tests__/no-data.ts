import { Selector } from 'testcafe';

import { NoDataProps } from '@sbercloud/uikit-product-no-data';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

type VisitProps = Partial<Pick<NoDataProps, 'title' | 'description'>>;

const testId = 'no-data__test';
const title = 'NoDataTitle';
const description = 'NoDataDescription';

function getPage(props: VisitProps = {}) {
  return getTestcafeUrl({
    name: 'no-data',
    group: 'no-data',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });
}

fixture('NoData:');

test.page(getPage())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).visible).ok();
});

test.page(getPage({ title }))('title = `NoDataTitle`, title should be `NoDataTitle`', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).textContent).contains(title);
});

test.page(getPage({ description }))(
  'description = `NoDataDescription`, description should be `NoDataDescription`',
  async t => {
    await t.expect(Selector(dataTestIdSelector(testId)).textContent).contains(description);
  },
);
