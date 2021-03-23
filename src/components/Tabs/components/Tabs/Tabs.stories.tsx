import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Avatar } from 'components/Avatar';
import { CollapsePanel, CollapsePanelItem } from 'components/CollapsePanel';
import { Tab } from 'components/Tabs/helperComponents/Tab';

import { Tabs, TabsTheme, ITabsProps } from './Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as Meta;

const Template: Story<ITabsProps> = ({ ...args }) => (
  <Tabs
    theme={args.theme === 'gray' ? TabsTheme.gray : TabsTheme.default}
    {...args}
  >
    <Tab
      label='Группы в управлении 2'
      identKey={0}
      onClick={e => console.log('click', e)}
    >
      <CollapsePanel isShowFavourites>
        <CollapsePanelItem
          index={0}
          header={
            <Avatar shape='square' size={72}>
              G O
            </Avatar>
          }
        >
          Content1
        </CollapsePanelItem>
        <CollapsePanelItem
          index={1}
          isFavourite
          header={
            <Avatar shape='square' size={72}>
              G O
            </Avatar>
          }
        >
          Content2
        </CollapsePanelItem>
      </CollapsePanel>
    </Tab>
    <Tab label='Мои группы 3' identKey={1}>
      Мои группы
    </Tab>
    <Tab label='Избранное' identKey={2}>
      Избранное
    </Tab>
  </Tabs>
);

export const tabs = Template.bind({});
tabs.args = {};
tabs.parameters = {};
tabs.argTypes = {
  theme: {
    defaultValue: 'gray',
    control: {
      type: 'radio',
      options: ['default', 'gray'],
    },
  },
};
