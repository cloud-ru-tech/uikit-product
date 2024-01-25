import { Meta, StoryFn } from '@storybook/react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChevronLeftSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PageForm, PageFormProps } from '../src/components/Page';

export default {
  title: 'Snack UIkit/Layout/PageForm',
  component: PageForm,
} as Meta;

const Template: StoryFn<PageFormProps & { showPrefix: boolean }> = ({ showPrefix, prefix, ...args }) => (
  <PageForm {...args} prefix={showPrefix ? prefix : null} />
);

export const pageForm = Template.bind({});

pageForm.args = {
  title: 'Lorem ipsum dolor',
  prefix: <ButtonFunction label='Go back' icon={<ChevronLeftSVG />} iconPosition='before' />,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci aliquid amet atque, consectetur deleniti dolorem dolorum ducimus eaque esse et fugiat hic illum inventore ipsum iure laudantium mollitia nemo perspiciatis quasi quos reiciendis ullam, veniam voluptates voluptatibus? Ad, laborum?',
  showPrefix: true,
};

pageForm.argTypes = {
  showPrefix: { name: '[Stories]: show prefix' },
  prefix: { table: { disable: true } },
};

pageForm.parameters = {
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
