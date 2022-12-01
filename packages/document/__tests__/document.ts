import { Selector } from 'testcafe';

import { DocumentProps } from '@sbercloud/uikit-product-document';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'document-test';
const noMimeTypeTestId = 'no-mime-type';
const longTitleTestId = 'long-title';
const file = { name: 'test.txt', size: 374329606 };

function getPage(props?: DocumentProps) {
  return getTestcafeUrl({
    name: 'document',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });
}

fixture('[Document]').page(getPage());

test('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});

test('Renders correctly without MIMEType prop', async t => {
  const control = await Selector(dataTestIdSelector(noMimeTypeTestId));

  await t.expect(control.find(dataTestIdSelector('document__type')).textContent).eql('TXT');
  await t.expect(control.find(dataTestIdSelector('document__size')).textContent).eql('764.46 Kb');
});

test('Shows tooltip on hover for long display name', async t => {
  const tooltipTime = 500;

  const control = await Selector(dataTestIdSelector(longTitleTestId));

  await t.hover(control);
  await t.expect(Selector(dataTestIdSelector('document__tooltip')).exists).ok({ timeout: tooltipTime });
});

test.page(getPage({ file, removeButton: { onClick() {}, tooltip: { content: testId } } }))(
  'Renders remove button with tooltip',
  async t => {
    const tooltipTime = 1500;
    const removeButton = await Selector(dataTestIdSelector(testId)).find(dataTestIdSelector('document__remove'));

    await t.expect(removeButton.exists).ok();
    await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-test-remove-clicked')).notOk();

    await t.click(removeButton);
    await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-test-remove-clicked')).ok();

    await t.hover(removeButton);

    await t.expect(Selector(dataTestIdSelector('button-tooltip__ButtonIconBase')).exists).ok({ timeout: tooltipTime });
  },
);

test.page(getPage({ file, removeButton: undefined }))('Renders without remove button', async t => {
  const removeButton = await Selector(dataTestIdSelector(testId)).find(dataTestIdSelector('document__remove'));

  await t.expect(removeButton.exists).notOk();
});

test.page(getPage({ file }))('onClick handler should fire once the file is clicked', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-test-download-clicked')).notOk();

  await t.click(Selector(dataTestIdSelector(testId)).find(dataTestIdSelector('document__name')));

  await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-test-download-clicked')).ok();
});

test.page(getPage({ file, disabled: true }))('Nothing should happen once disabled document is clicked', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-test-download-clicked')).notOk();

  await t.click(Selector(dataTestIdSelector(testId)).find(dataTestIdSelector('document__name')));

  await t.expect(Selector(dataTestIdSelector(testId)).hasAttribute('data-test-download-clicked')).notOk();
});
