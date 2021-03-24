import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  TrashSVG,
  FilterSVG,
  RefreshSVG,
  ExcludeSVG,
  RowExpandedSVG,
} from '@aicloud/ui-icons';

import { ListToolBar, IListToolBarWrapperProps } from './ListToolBar';

export default {
  title: 'Components/List Tool Bar',
} as Meta;

const Template: Story<IListToolBarWrapperProps> = () => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <ListToolBar.Wrapper>
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
      <ListToolBar.Button>
        <FilterSVG />
      </ListToolBar.Button>
      <ListToolBar.Button>
        <RowExpandedSVG />
      </ListToolBar.Button>
      <ListToolBar.Button>
        <ExcludeSVG />
      </ListToolBar.Button>
    </ListToolBar.Wrapper>
  );
};

export const listToolBar = Template.bind({});
listToolBar.args = {};
listToolBar.argTypes = {};
