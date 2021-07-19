import {
  DeleteInterfaceSVG,
  FilterInterfaceSVG,
  RefreshInterfaceSVG,
  RowExpandedInterfaceSVG,
  TableSettingsInterfaceSVG,
} from '@sbercloud/uikit-react-icons';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toolbar, ToolbarWrapperProps } from '../src';

export default {
  title: 'Not stable/Toolbar',
} as Meta;

const Template: Story<ToolbarWrapperProps> = ({ ...args }) => {
  const [value, setValue] = useState<string>('');

  return (
    <Toolbar.Wrapper {...args}>
      <Toolbar.Button>
        <RefreshInterfaceSVG />
      </Toolbar.Button>
      <Toolbar.Button disabled>
        <DeleteInterfaceSVG />
      </Toolbar.Button>
      <Toolbar.Input
        value={value}
        onChange={(value): void => {
          setValue(value);
        }}
      />
      <Toolbar.Button badgeText='3'>
        <FilterInterfaceSVG />
      </Toolbar.Button>
      <Toolbar.Button>
        <RowExpandedInterfaceSVG />
      </Toolbar.Button>
      <Toolbar.Button isActive>
        <TableSettingsInterfaceSVG />
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
