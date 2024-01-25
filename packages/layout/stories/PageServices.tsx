import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PageServices, PageServicesProps } from '../src/components/Page';
import { HeadlineActions } from './components/HeadlineActions';
import { Sidebar } from './components/Sidebar';

export default {
  title: 'Snack UIkit/Layout/PageServices',
  component: PageServices,
} as Meta;

const sidebars = {
  none: null,
  big: <Sidebar option='Sidebar menu item' />,
  small: <Sidebar />,
};

const Template: StoryFn<
  PageServicesProps & {
    showSidebar: 'none' | 'big' | 'small';
    showActions: boolean;
  }
> = ({ showSidebar, showActions, ...args }) => (
  <PageServices {...args} sidebar={sidebars[showSidebar]} actions={showActions ? args.actions : null} />
);

export const pageServices = Template.bind({});

pageServices.args = {
  title: 'Lorem ipsum dolor',
  actions: <HeadlineActions />,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dicta eum maiores nihil nobis, voluptatem. Ab alias commodi consequatur cum dignissimos earum fuga ipsa minus natus, necessitatibus nobis quod totam voluptatem? Assumenda beatae eius magni neque nisi rerum. Nobis, odio.',
  showSidebar: 'big',
  showActions: true,
};

pageServices.argTypes = {
  showSidebar: { name: '[Stories]: show sidebar', control: { type: 'select' }, options: ['none', 'big', 'small'] },
  showActions: { name: '[Stories]: show headline actions' },
  sidebar: { table: { disable: true } },
  actions: { table: { disable: true } },
};

pageServices.parameters = {
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
