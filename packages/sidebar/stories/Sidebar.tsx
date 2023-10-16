import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Sidebar, SidebarItemId, SidebarProps } from '../src/components';
import { footerItems, menuList } from './mocks/menuList';

const meta: Meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
};
export default meta;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

function Template({ active, ...args }: SidebarProps) {
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
}

export const sidebar: StoryFn<SidebarProps> = Template.bind({});
sidebar.args = {
  list: menuList,
  footerItems,
  active: 'main-advanced',
};
sidebar.argTypes = {
  active: {
    type: 'string',
  },
};
sidebar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=802%3A0',
  },
};
