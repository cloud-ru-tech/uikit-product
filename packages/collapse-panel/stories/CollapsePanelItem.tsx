import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Avatar } from '@sbercloud/uikit-react-avatar';
import { Input } from '@sbercloud/uikit-react-input';

import { CollapsePanelItem, CollapsePanelItemProps } from '../src';

export default {
  title: 'Components/CollapsePanel',
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
      header={<Avatar shape={Avatar.shapes.Circle} size={72} username='G O' />}
    >
      <ContentStyled>Content</ContentStyled>
      <Input value={'Some text'} />
    </CollapsePanelItem>
  );
};

export const collapsePanelItem = Template.bind({});
collapsePanelItem.args = {};
collapsePanelItem.parameters = {};
