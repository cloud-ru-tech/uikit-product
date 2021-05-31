import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Spin, SpinDefaultProps } from '../src';
import { Sizes } from '../src/helpers/constants';

export default {
  title: 'Components/Spin',
  component: Spin,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<SpinDefaultProps> = args => <Spin {...args} />;

export const spin = Template.bind({});
spin.args = {
  text: 'Text',
};
spin.argTypes = {
  size: {
    control: {
      type: 'radio',
      options: Object.values(Sizes),
    },
  },
  borderSize: {
    control: {
      type: 'number',
    },
  },
  text: {
    control: {
      type: 'text',
    },
  },
};
spin.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
