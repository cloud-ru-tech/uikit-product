import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PageCatalog, PageCatalogProps } from '../src/components/Page';
import { HeadlineActions } from './components/HeadlineActions';

export default {
  title: 'Snack UIkit/Layout/PageCatalog',
  component: PageCatalog,
} as Meta;

const Template: StoryFn<
  PageCatalogProps & {
    showActions: boolean;
  }
> = ({ showActions, ...args }) => <PageCatalog {...args} actions={showActions ? args.actions : undefined} />;

export const pageCatalog = Template.bind({});

pageCatalog.args = {
  title: 'Lorem ipsum dolor',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci aliquid amet atque, consectetur deleniti dolorem dolorum ducimus eaque esse et fugiat hic illum inventore ipsum iure laudantium mollitia nemo perspiciatis quasi quos reiciendis ullam, veniam voluptates voluptatibus? Ad, laborum?',
  actions: <HeadlineActions />,
  showActions: true,
};

pageCatalog.argTypes = {
  actions: { table: { disable: true } },
  showActions: { name: '[Stories]: show headline actions' },
};

pageCatalog.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?node-id=2%3A17574&mode=dev',
  },
  layout: 'fullscreen',
};
