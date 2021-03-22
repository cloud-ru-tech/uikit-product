import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Avatar } from 'components/Avatar';
// import { CollapsePanel, CollapsePanelItem } from 'components/CollapsePanel';
import { Tab } from 'components/Tabs/helperComponents/Tab';

import { Tabs, TabsTheme } from './Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as Meta;

const Template: Story = ({ ...args }) => (
  <Tabs theme={TabsTheme.gray} defaultKey={1}>
    <Tab
      label='Группы в управлении 2'
      identKey={0}
      onClick={ee => console.log('click', ee)}
    >
      {/* <CollapsePanel isShowFavorites>
        <CollapsePanelItem
          index='a'
          header={
            <Avatar shape='square' size={72}>
              G O
            </Avatar>
          }
        >
          <div style={{ marginTop: '20px' }}>Content</div>
        </CollapsePanelItem>
        <CollapsePanelItem
          index='b'
          header={
            <Avatar shape='square' size={72}>
              G O
            </Avatar>
          }
          isFavorites
        >
          <div style={{ marginTop: '20px' }}>Content</div>
        </CollapsePanelItem>
      </CollapsePanel> */}
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
