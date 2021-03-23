import { useState } from 'react';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Avatar } from 'components/Avatar';
import { Select } from 'components/Select';

import {
  CollapsePanelItem,
  ICollapsePanelItemProps,
} from './CollapsePanelItem';

export default {
  title: 'Components/CollapsePanel',
  component: CollapsePanelItem,
} as Meta;

const storage = [
  { value: 'S3', label: 'S3' },
  { value: 'NFS', label: 'NFS' },
];

const ContentStyled = styled.div`
  margin-top: 20px;
`;

const Template: Story<ICollapsePanelItemProps> = ({ ...args }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <CollapsePanelItem
      {...args}
      isCollapsed={isCollapsed}
      handleClick={() => setIsCollapsed(isCollapsed => !isCollapsed)}
      index={0}
      header={
        <Avatar shape='square' size={72}>
          G O
        </Avatar>
      }
    >
      <ContentStyled>Content</ContentStyled>
      <Select defaultValue={storage[0]} options={storage} type='medium' />
    </CollapsePanelItem>
  );
};

export const collapsePanelItem = Template.bind({});
collapsePanelItem.args = {};
collapsePanelItem.parameters = {};
