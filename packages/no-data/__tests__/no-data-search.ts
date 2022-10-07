import { Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'no-data-search__test';

fixture('NoDataSearch').page(
  getTestcafeUrl({
    name: 'no-data-search',
    group: 'no-data',
    props: { 'data-test-id': testId },
  }),
);

test('title and description should be displayed', async t => {
  const title = 'Ничего не найдено';
  const description = 'Попробуйте изменить запрос';
  const textContent = Selector(dataTestIdSelector(testId)).textContent;

  await t.expect(textContent).contains(title);
  await t.expect(textContent).contains(description);
});
