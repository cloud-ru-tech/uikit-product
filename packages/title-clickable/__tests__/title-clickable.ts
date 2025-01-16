import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'title-clickable';

const TEST_IDS = {
  content: `${TEST_ID}__content`,
  chevron: `${TEST_ID}__chevron`,
  icon: `${TEST_ID}__icon`,
  title: `${TEST_ID}__title`,
  avatar: `${TEST_ID}__avatar`,
  avatarLabel: `${TEST_ID}__avatar-label`,
  avatarSubtitle: `${TEST_ID}__avatar-subtitle`,
  subtitle: `${TEST_ID}__subtitle`,
  customNode: `${TEST_ID}__custom-node`,
};

const SlotVariants = {
  Title: 'title',
  TitleIcon: 'title with icon',
  Avatar: 'avatar',
  Custom: 'custom node',
};

const getPage = (props: Record<string, unknown>) =>
  getTestcafeUrl({
    name: 'title-clickable',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

function getSelectors() {
  const titleClickable = Selector(dataTestIdSelector(TEST_ID));
  const title = titleClickable.find(dataTestIdSelector(TEST_IDS.title));
  const icon = titleClickable.find(dataTestIdSelector(TEST_IDS.icon));
  const avatar = titleClickable.find(dataTestIdSelector(TEST_IDS.avatar));
  const label = titleClickable.find(dataTestIdSelector(TEST_IDS.avatarLabel));
  const subtitle = titleClickable.find(dataTestIdSelector(TEST_IDS.avatarSubtitle));
  const customNode = titleClickable.find(dataTestIdSelector(TEST_IDS.customNode));

  return {
    titleClickable,
    title,
    icon,
    avatar,
    label,
    subtitle,
    customNode,
  };
}

fixture('TitleClickable');

test.page(getPage({ title: 'Title clickable', slotMode: SlotVariants.Title }))('should render with title', async t => {
  const { title, icon, avatar, label, subtitle } = getSelectors();

  await t.expect(title.exists).ok();

  await t.expect(icon.exists).notOk();
  await t.expect(avatar.exists).notOk();
  await t.expect(label.exists).notOk();
  await t.expect(subtitle.exists).notOk();
});

test.page(getPage({ slotMode: SlotVariants.TitleIcon, title: 'Title clickable', icon: 'PlaceholderSVG' }))(
  'should render with title and icon',
  async t => {
    const { title, icon } = getSelectors();

    await t.expect(title.exists).ok();
    await t.expect(icon.exists).ok();
  },
);

test.page(
  getPage({
    avatar: { name: 'Denis Villeneuve', showTwoSymbols: true, subtitle: 'duna@gmail.com' },
    slotMode: SlotVariants.Avatar,
  }),
)('should render with avatar', async t => {
  const { avatar, label, subtitle } = getSelectors();

  await t.expect(avatar.exists).ok();
  await t.expect(label.exists).ok();
  await t.expect(subtitle.exists).ok();
});

test.page(getPage({ children: '<div data-test-id="custom-node" />', slotMode: SlotVariants.Custom }))(
  'should render with custom node',
  async t => {
    const { customNode } = getSelectors();

    await t.expect(customNode.hasChildNodes).ok();
  },
);
