import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { Counter } from '@snack-uikit/counter';
import { Tag } from '@snack-uikit/tag';
import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TitleClickable, TitleClickableProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Title Clickable',
  component: TitleClickable,
};
export default meta;

const SlotVariants = {
  Title: 'title',
  TitleIcon: 'title with icon',
  Avatar: 'avatar',
  Custom: 'custom node',
};

const SLOTS_MOCK = [
  {
    type: SlotVariants.Title,
    props: { title: 'Title clickable' },
  },
  {
    type: SlotVariants.TitleIcon,
    props: { title: 'Title clickable', icon: PlaceholderSVG },
  },
  {
    type: SlotVariants.Avatar,
    props: { avatar: { name: 'Denis Villeneuve', showTwoSymbols: true, subtitle: 'duna@gmail.com' } },
  },
  {
    type: SlotVariants.Custom,
    props: {
      children: (
        <div data-test-id='title-clickable__custom-node'>
          <Tag label='Managed Kubernetes' />
          <Counter value={10} />
        </div>
      ),
    },
  },
];

type TitleClickableStoriesProps = TitleClickableProps & {
  slotMode: ValueOf<typeof SlotVariants>;
};

const Template: StoryFn<TitleClickableStoriesProps> = ({ ...args }) => {
  const slot = SLOTS_MOCK.find(el => el.type === args['slotMode']);

  return (
    <div className={styles.wrapper}>
      <TitleClickable {...slot?.props} {...args} />
    </div>
  );
};

export const titleClickable: StoryObj<TitleClickableStoriesProps> = {
  render: Template,
  args: {
    slotMode: SlotVariants.Title,
    href: '#',
  },
  argTypes: {
    slotMode: {
      name: '[Story]: Slot variants',
      options: Object.values(SlotVariants),
      control: {
        type: 'radio',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-components?node-id=24195-958',
    },
  },
};
