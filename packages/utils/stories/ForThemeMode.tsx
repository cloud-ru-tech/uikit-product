import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ForThemeMode, ForThemeModeProps } from '../src';

const meta: Meta = {
  title: 'Utils/ForThemeMode',
  component: ForThemeMode,
};
export default meta;

function Template(props: ForThemeModeProps) {
  return <ForThemeMode {...props} />;
}

export const forThemeMode: StoryFn<ForThemeModeProps> = Template.bind({});
forThemeMode.args = {
  light: <h2>This is calm light theme 🌸</h2>,
  dark: <h2>This is scary dark theme 🎃</h2>,
};
forThemeMode.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
};
