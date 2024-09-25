import { Meta, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InfoGroup, InfoGroupItem, InfoGroupProps } from '../src';

const meta: Meta = {
  title: 'Snack UIkit/Info Row/Info Group',
  component: InfoGroup,
};
export default meta;

type MockData = {
  firstName: string;
  lastName?: string;
  age: number;
  about?: string;
  isAdmin: boolean;
};

type StoryProps = InfoGroupProps<MockData>;

const data: MockData = {
  firstName: 'John',
  lastName: undefined,
  about:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam est eveniet rerum ullam vero? Ab dignissimos, dolorem expedita, explicabo iure necessitatibus nemo nihil, quam quibusdam quis quisquam quos tempora temporibus.',
  age: 21,
  isAdmin: false,
};

const items: InfoGroupItem<MockData>[] = [
  {
    label: 'Имя',
    accessorKey: 'firstName',
  },
  {
    label: 'Фамилия',
    accessorKey: 'lastName',
  },
  {
    label: 'Возраст',
    accessorKey: 'age',
  },
  {
    label: 'О себе',
    accessorKey: 'about',
    labelTooltip: {
      tip: 'Очень интересная информация',
      placement: 'right',
    },
  },
  {
    label: 'Админ',
    accessorKey: 'isAdmin',
    rowActions: {
      first: {
        icon: <PlaceholderSVG />,
      },
    },
  },
];

function Template({ items, data, ...args }: StoryProps) {
  return <InfoGroup data={data} items={items} {...args} />;
}

export const infoGroup: StoryObj<StoryProps> = {
  render: Template,

  args: {
    data,
    items,
    loading: false,
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=1472%3A113&mode=design&t=FXW8WrjOqCcvfkWa-1',
    },
  },
};
