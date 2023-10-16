import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { Avatar } from '@sbercloud/uikit-product-avatar';
import { InputCommon } from '@sbercloud/uikit-product-input';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CollapsePanel, CollapsePanelItem, CollapsePanelProps } from '../src';

const meta: Meta = {
  title: 'Not stable/CollapsePanel/Collapse Panel',
  component: CollapsePanel,
};
export default meta;

const avatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const ContentStyled = styled.div`
  margin-top: 20px;
`;

function Template({ ...args }: CollapsePanelProps) {
  return (
    <CollapsePanel {...args}>
      <CollapsePanelItem
        index={0}
        header={<Avatar variant={Avatar.variants.User} name='' size={Avatar.sizes.Large} src={avatarSrc} />}
      >
        <ContentStyled>Content</ContentStyled>
        <InputCommon value={'Some text'} onChange={() => {}} />
      </CollapsePanelItem>
      <CollapsePanelItem index={1} header={<div>Vertical Scrolling</div>} isFavourite>
        <ContentStyled>{'Content '.repeat(500)}</ContentStyled>
      </CollapsePanelItem>
      <CollapsePanelItem index={2} header={<div>Horizontal Scrolling</div>} isFavourite>
        <ContentStyled>{'Content'.repeat(100)}</ContentStyled>
      </CollapsePanelItem>
      <CollapsePanelItem
        index={3}
        header={<Avatar variant={Avatar.variants.User} name='' size={Avatar.sizes.Large} src={avatarSrc} />}
        isFavourite
      >
        <ContentStyled>{'Content'}</ContentStyled>
      </CollapsePanelItem>
    </CollapsePanel>
  );
}

export const collapsePanel: StoryFn<CollapsePanelProps> = Template.bind({});
collapsePanel.args = {};
collapsePanel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
