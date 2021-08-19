import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { ButtonToolbar, RefreshButton } from '@sbercloud/uikit-react-button';
import { TFilterValueType } from '@sbercloud/uikit-react-filter';
import { DeleteInterfaceSVG, RowExpandedInterfaceSVG, TableSettingsInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps } from '@sbercloud/uikit-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toolbar, ToolbarWrapperProps } from '../src';
import { defOpt, defValue } from './helpers/mockData';

export default {
  title: 'Not stable/Toolbar',
  component: Toolbar.Wrapper,
} as Meta;

const Template: Story<WithSupportProps<ToolbarWrapperProps>> = ({ ...args }) => {
  const [value, setValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<TFilterValueType[] | string>(defValue);

  return (
    <Toolbar.Wrapper {...args}>
      <RefreshButton as={ButtonToolbar} />
      <Toolbar.Button disabled tooltip='Удалить'>
        <DeleteInterfaceSVG />
      </Toolbar.Button>
      <Toolbar.Input
        value={value}
        onChange={(value): void => {
          setValue(value);
        }}
      />
      <Toolbar.Button tooltip='Раскрыть'>
        <RowExpandedInterfaceSVG />
      </Toolbar.Button>
      <Toolbar.Button isActive tooltip='Настройки'>
        <TableSettingsInterfaceSVG />
      </Toolbar.Button>
      <Toolbar.Filter
        filterOptions={defOpt}
        value={filterValue}
        onChange={(val, queryString) => {
          setFilterValue(queryString);
        }}
      />
    </Toolbar.Wrapper>
  );
};

export const toolbar = Template.bind({});
toolbar.args = {};
toolbar.argTypes = {
  'data-test-id': {
    control: {
      type: 'text',
    },
  },
};
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
