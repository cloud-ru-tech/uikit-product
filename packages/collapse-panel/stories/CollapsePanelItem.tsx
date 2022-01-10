import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Avatar } from '@sbercloud/uikit-react-avatar';
import { Input } from '@sbercloud/uikit-react-input';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CollapsePanelItem, CollapsePanelItemProps } from '../src';

export default {
  title: 'Not stable/CollapsePanel/Collapse Panel Item',
  component: CollapsePanelItem,
} as Meta;

const ContentStyled = styled.div`
  margin-top: 20px;
`;

const Template: Story<CollapsePanelItemProps> = ({ ...args }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <CollapsePanelItem
      {...args}
      isCollapsed={isCollapsed}
      handleClick={() => setIsCollapsed(isCollapsed => !isCollapsed)}
      index={0}
      header={<Avatar shape={Avatar.shapes.Circle} size={Avatar.sizes.M} username='G O' />}
    >
      <ContentStyled>Content</ContentStyled>
      <Input value={'Some text'} onChange={() => {}} />
    </CollapsePanelItem>
  );
};

export const collapsePanelItem = Template.bind({});
collapsePanelItem.args = {};
collapsePanelItem.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
