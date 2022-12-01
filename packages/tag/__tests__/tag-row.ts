import { fixture, Selector, test } from 'testcafe';

import { TagRowProps } from '@sbercloud/uikit-product-tag';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'tag-row-test';
const cloudTriggerButton = 'tag-cloud-trigger';
const tagCloud = 'tag-cloud';
const tagText = 'tag-text';
const tagRemoveButton = 'tag-remove-button';

const getVisibleTagsWrapper = () => Selector(dataTestIdSelector(testId)).child(1);
const getTagCloudWrapper = () => Selector(dataTestIdSelector(tagCloud)).child(0);

const getCloudTriggerButton = () => Selector(dataTestIdSelector(cloudTriggerButton));
const getTagCloudTriggerButtonText = () =>
  Selector(dataTestIdSelector(cloudTriggerButton)).find(dataTestIdSelector(tagText)).textContent;

const getAmountOfVisibleTags = () => getVisibleTagsWrapper().find('div').count;
const getAmountOfCloudTags = () => getTagCloudWrapper().child().count;

const getCloudWrapperState = () => getTagCloudWrapper().getAttribute('data-state');

const getFirstVisibleTag = () => getVisibleTagsWrapper().child(0);
const getFirstVisibleTagText = () => getFirstVisibleTag().find(dataTestIdSelector(tagText)).textContent;

const getFirstCloudTag = () => getTagCloudWrapper().child(0);
const getFirstCloudTagText = () => getFirstCloudTag().find(dataTestIdSelector(tagText)).textContent;

const getTagDeleteButton = (selector: Selector) => selector.find(dataTestIdSelector(tagRemoveButton));

function getPage(props?: Partial<TagRowProps> & { showRemoveButtons: boolean }) {
  return getTestcafeUrl({
    name: 'tag-row',
    group: 'tag',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });
}

fixture('Tag Row').beforeEach(async t => {
  await t.resizeWindow(1180, 600);
});

test.page(getPage())('Tag Cloud Renders', async t => {
  await t.hover(Selector(dataTestIdSelector(cloudTriggerButton)));

  await t.expect(Selector(dataTestIdSelector(tagCloud)).exists).ok();
});

test.page(getPage())(
  'If the container width is changed, the amount of visible tags is minimized and they can be accessed by hovering the plus icon',
  async t => {
    await t.expect(getAmountOfVisibleTags()).eql(19);
    await t.expect(getTagCloudTriggerButtonText()).eql('+1');

    await t.hover(getCloudTriggerButton());
    await t.expect(getCloudWrapperState()).eql('entered');
    await t.expect(getAmountOfCloudTags()).eql(1);

    await t.resizeWindow(600, 600);
    await t.expect(getAmountOfVisibleTags()).eql(9);
    await t.expect(getTagCloudTriggerButtonText()).eql('+11');

    await t.hover(getCloudTriggerButton());
    await t.expect(getCloudWrapperState()).eql('entered');
    await t.expect(getAmountOfCloudTags()).eql(11);
  },
);

test.page(getPage({ showRemoveButtons: true }))('If a tag has a delete button, it can be deleted', async t => {
  await t.expect(getAmountOfVisibleTags()).eql(14);
  await t.expect(getTagCloudTriggerButtonText()).eql('+6');

  await t.hover(getCloudTriggerButton());
  await t.expect(getCloudWrapperState()).eql('entered');
  await t.expect(getAmountOfCloudTags()).eql(6);

  await t.expect(getFirstVisibleTagText()).eql('0xxxx');

  // Deleting a visible tag
  await t.click(getTagDeleteButton(getFirstVisibleTag()));
  await t.expect(getFirstVisibleTagText()).eql('1xxxxx');
  await t.expect(getAmountOfVisibleTags()).eql(14);
  await t.expect(getTagCloudTriggerButtonText()).eql('+5');

  await t.hover(getCloudTriggerButton());
  await t.expect(getCloudWrapperState()).eql('entered');
  await t.expect(getAmountOfCloudTags()).eql(5);
  await t.expect(getFirstCloudTagText()).eql('15xxxx');

  // Deleting a cloud tag
  await t.click(getTagDeleteButton(getFirstCloudTag()));
  await t.expect(getAmountOfVisibleTags()).eql(14);
  await t.expect(getTagCloudTriggerButtonText()).eql('+4');

  await t.hover(getCloudTriggerButton());
  await t.expect(getCloudWrapperState()).eql('entered');
  await t.expect(getAmountOfCloudTags()).eql(4);
  await t.expect(getFirstCloudTagText()).eql('16x');
});
