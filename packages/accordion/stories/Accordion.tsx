import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Accordion, AccordionProps } from '../src';

export default {
  title: 'Not stable/Accordion',
  component: Accordion,
} as Meta;

const Template: StoryFn<AccordionProps> = ({ ...args }) => <Accordion {...args} />;

export const accordion = Template.bind({});

accordion.args = {
  header: 'Accordion Header',
  subheader: 'Accordion Subheader',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  tooltip: 'Tooltip text',
  variant: Accordion.variants.Primary,
  disabled: false,
};

accordion.argTypes = {};

accordion.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cdtItYHTIEGB0wMZPAp729/%5BLIB%5D-Platform-DS-%E2%88%99-Sandbox?type=design&node-id=1326-174372&t=SWIlCe8vYWEpjbI3-0',
  },
};
