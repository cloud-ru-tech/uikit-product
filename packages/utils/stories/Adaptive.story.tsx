import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { getUserAgentInfo, useAdaptive } from '../src';

const meta: Meta = {
  title: 'Utils/Adaptive',
};
export default meta;

function Template() {
  const results = getUserAgentInfo();
  const { layoutType } = useAdaptive();

  return (
    <div>
      <p>Device model: {results.device.model}</p>
      <p>Device type: {results.device.type}</p>
      <p>Browser name: {results.browser.name}</p>
      <p>Browser version: {results.browser.version}</p>
      <p>--------------------------------</p>
      <p>Layout type: {layoutType}</p>
    </div>
  );
}

export const adaptive: StoryObj<unknown> = {
  render: Template,
  args: {},
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.STABLE],
  },
};
