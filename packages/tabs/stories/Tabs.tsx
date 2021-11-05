import { Meta, Story } from '@storybook/react/types-6-0';

import { Avatar } from '@sbercloud/uikit-react-avatar';
import { CollapsePanel, CollapsePanelItem } from '@sbercloud/uikit-react-collapse-panel';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITabsProps, Tab, Tabs, TabsTheme } from '../src';

export default {
  title: 'Not stable/Tabs',
  component: Tabs,
} as Meta;

const Template: Story<ITabsProps> = ({ ...args }) => (
  <Tabs theme={args.theme === 'gray' ? TabsTheme.gray : TabsTheme.default} {...args}>
    <Tab label='Группы в управлении 2' identKey={0} onClick={() => {}}>
      <CollapsePanel isShowFavourites>
        <CollapsePanelItem
          index={0}
          header={<Avatar shape={Avatar.shapes.Square} size={Avatar.sizes.M} username={'G O'} />}
        >
          Content1
        </CollapsePanelItem>
        <CollapsePanelItem
          index={1}
          isFavourite
          header={<Avatar shape={Avatar.shapes.Square} size={Avatar.sizes.M} username={'G O'} />}
        >
          Content2
        </CollapsePanelItem>
      </CollapsePanel>
    </Tab>
    <Tab label='Мои группы 3' identKey={1}>
      Мои группы
    </Tab>
    <Tab label='Избранное' identKey={2} isDisabled>
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
