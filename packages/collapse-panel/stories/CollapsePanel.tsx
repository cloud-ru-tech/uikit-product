import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Avatar } from '@sbercloud/uikit-react-avatar';
import { Input } from '@sbercloud/uikit-react-input';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CollapsePanel, CollapsePanelItem, ICollapsePanelProps } from '../src';

export default {
  title: 'Not stable/CollapsePanel/Collapse Panel',
  component: CollapsePanel,
} as Meta;

const avatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const ContentStyled = styled.div`
  margin-top: 20px;
`;

const Template: Story<ICollapsePanelProps> = ({ ...args }) => (
  <CollapsePanel {...args}>
    <CollapsePanelItem index={0} header={<Avatar shape={Avatar.shapes.Circle} size={Avatar.sizes.M} src={avatarSrc} />}>
      <ContentStyled>Content</ContentStyled>
      <Input value={'Some text'} />
    </CollapsePanelItem>
    <CollapsePanelItem index={1} header={<div>Vertical Scrolling</div>} isFavourite>
      <ContentStyled>{'Content '.repeat(500)}</ContentStyled>
    </CollapsePanelItem>
    <CollapsePanelItem index={2} header={<div>Horizontal Scrolling</div>} isFavourite>
      <ContentStyled>{'Content'.repeat(100)}</ContentStyled>
    </CollapsePanelItem>
    <CollapsePanelItem
      index={3}
      header={<Avatar shape={Avatar.shapes.Square} size={Avatar.sizes.M} src={avatarSrc} />}
      isFavourite
    >
      <ContentStyled>{'Content'}</ContentStyled>
    </CollapsePanelItem>
  </CollapsePanel>
);

export const collapsePanel = Template.bind({});
collapsePanel.args = {};
collapsePanel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
