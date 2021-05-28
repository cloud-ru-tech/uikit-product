import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import { ExcludeSVG, FilterSVG, RefreshSVG, RowExpandedSVG, TrashSVG } from '@sbercloud/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toolbar, ToolbarWrapperProps } from '../src';

export default {
  title: 'Components/Toolbar',
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<ToolbarWrapperProps> = ({ ...args }) => {
  const [value, setValue] = useState<string>('');

  return (
    <Toolbar.Wrapper {...args}>
      <Toolbar.Button>
        <RefreshSVG />
      </Toolbar.Button>
      <Toolbar.Button disabled>
        <TrashSVG />
      </Toolbar.Button>
      <Toolbar.Input
        value={value}
        onChange={(value): void => {
          setValue(value);
        }}
      />
      <Toolbar.Button badgeText='3'>
        <FilterSVG />
      </Toolbar.Button>
      <Toolbar.Button>
        <RowExpandedSVG />
      </Toolbar.Button>
      <Toolbar.Button isActive>
        <ExcludeSVG />
      </Toolbar.Button>
    </Toolbar.Wrapper>
  );
};

export const toolbar = Template.bind({});
toolbar.args = {};
toolbar.argTypes = {};
toolbar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
