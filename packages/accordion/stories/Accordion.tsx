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
  content: 'Custom Content',
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
    //TODO: update to the correct one
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
