import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Paginator, PaginatorProps } from '../src';

export default {
  title: 'Not stable/Paginator',
  component: Paginator,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<PaginatorProps> = ({ ...args }) => <Paginator {...args} />;

export const paginator = Template.bind({});
paginator.args = {};
paginator.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
paginator.argTypes = {
  pageCount: {
    control: {
      type: 'number',
    },
  },
  pageRangeDisplayed: {
    control: {
      type: 'number',
    },
  },
  marginPagesDisplayed: {
    control: {
      type: 'number',
    },
  },
  disableInitialCallback: {
    control: {
      type: 'boolean',
    },
  },
  initialPage: {
    control: {
      type: 'number',
    },
  },
  extraAriaContext: {
    control: {
      type: 'text',
    },
  },
};
