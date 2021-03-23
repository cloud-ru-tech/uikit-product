import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Avatar } from 'components/Avatar';
import { Select } from 'components/Select';
import { CollapsePanelItem } from 'components/CollapsePanel/components/CollapsePanelItem';

import { CollapsePanel, ICollapsePanelProps } from './CollapsePanel';

export default {
  title: 'Components/CollapsePanel',
  component: CollapsePanel,
} as Meta;

const avatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const ContentStyled = styled.div`
  margin-top: 20px;
`;

const storage = [
  { value: 'S3', label: 'S3' },
  { value: 'NFS', label: 'NFS' },
];

const Template: Story<ICollapsePanelProps> = ({ ...args }) => (
  <CollapsePanel {...args}>
    <CollapsePanelItem
      index={0}
      header={<Avatar shape='square' size={72} src={avatarSrc} />}
    >
      <ContentStyled>Content</ContentStyled>
      <Select defaultValue={storage[0]} options={storage} type='medium' />
    </CollapsePanelItem>
    <CollapsePanelItem
      index={1}
      header={<Avatar shape='square' size={72} src={avatarSrc} />}
      isFavourite
    >
      <ContentStyled>Content</ContentStyled>
    </CollapsePanelItem>
  </CollapsePanel>
);

export const collapsePanel = Template.bind({});
collapsePanel.args = {};
collapsePanel.parameters = {};
