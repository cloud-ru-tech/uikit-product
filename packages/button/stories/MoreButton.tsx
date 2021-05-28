import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MoreButton, MoreButtonProps } from '../src';

export default {
  title: 'Components/Button/More Button',
  component: MoreButton,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<MoreButtonProps> = ({ ...args }) => <MoreButton {...args} />;

export const moreButton = Template.bind({});
moreButton.args = {
  actions: [{ name: 'Удалить', onClick: () => {} }],
};
moreButton.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
