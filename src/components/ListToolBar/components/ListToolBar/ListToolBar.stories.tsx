import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  TrashSVG,
  FilterSVG,
  RefreshSVG,
  ExcludeSVG,
  RowExpandedSVG,
} from '@sbercloud/icons';

import { ListToolBar, IListToolBarWrapperProps } from './ListToolBar';

export default {
  title: 'Components/ListToolBar',
} as Meta;

const Template: Story<IListToolBarWrapperProps> = ({ ...args }) => {
  const [value, setValue] = useState<string>('');

  return (
    <ListToolBar.Wrapper {...args}>
      <ListToolBar.Button>
        <RefreshSVG />
      </ListToolBar.Button>
      <ListToolBar.Button disabled>
        <TrashSVG />
      </ListToolBar.Button>
      <ListToolBar.Input
        value={value}
        onChange={(value): void => {
          setValue(value);
        }}
      />
      <ListToolBar.Button badgeText='3'>
        <FilterSVG />
      </ListToolBar.Button>
      <ListToolBar.Button>
        <RowExpandedSVG />
      </ListToolBar.Button>
      <ListToolBar.Button isActive>
        <ExcludeSVG />
      </ListToolBar.Button>
    </ListToolBar.Wrapper>
  );
};

export const listToolBar = Template.bind({});
listToolBar.args = {};
listToolBar.argTypes = {};
