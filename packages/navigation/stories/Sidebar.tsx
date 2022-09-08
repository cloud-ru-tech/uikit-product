import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Sidebar, SidebarItemId, SidebarProps } from '../src/components';
import { footerItems, menuList } from './mocks/menuList';

export default {
  title: 'Not stable/Navigation/Sidebar',
  component: Sidebar,
} as Meta;

const Wrap = styled.div`
  height: 800px;
`;

const Template: Story<SidebarProps> = ({ active, ...args }) => {
  const [activeItem, setActiveItem] = useState<SidebarItemId | undefined>(active);

  useEffect(() => {
    setActiveItem(active);
  }, [active]);

  const handleItemClick: SidebarProps['onActiveChange'] = ({ id }) => {
    setActiveItem(id);
  };

  return (
    <Wrap>
      <Sidebar {...args} active={activeItem} onActiveChange={handleItemClick} />
    </Wrap>
  );
};

export const sidebar = Template.bind({});
sidebar.args = {
  list: menuList,
  footerItems,
};
sidebar.argTypes = {
  active: {
    type: 'string',
    defaultValue: 'main-advanced',
  },
};
sidebar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=802%3A0',
  },
};
