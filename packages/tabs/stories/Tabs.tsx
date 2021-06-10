/* eslint-disable no-console */
import { Avatar } from '@sbercloud/uikit-react-avatar';
import { CollapsePanel, CollapsePanelItem } from '@sbercloud/uikit-react-collapse-panel';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITabsProps, Tab, Tabs, TabsTheme } from '../src';

export default {
  title: 'Not stable/Tabs',
  component: Tabs,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<ITabsProps> = ({ ...args }) => (
  <Tabs theme={args.theme === 'gray' ? TabsTheme.gray : TabsTheme.default} {...args}>
    <Tab label='Группы в управлении 2' identKey={0} onClick={() => {}}>
      <CollapsePanel isShowFavourites>
        <CollapsePanelItem index={0} header={<Avatar shape={Avatar.shapes.Square} size={72} username={'G O'} />}>
          Content1
        </CollapsePanelItem>
        <CollapsePanelItem
          index={1}
          isFavourite
          header={<Avatar shape={Avatar.shapes.Square} size={72} username={'G O'} />}
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
tabs.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
tabs.argTypes = {
  theme: {
    defaultValue: 'gray',
    control: {
      type: 'radio',
      options: ['default', 'gray'],
    },
  },
};
