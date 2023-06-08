import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Avatar } from '@sbercloud/uikit-product-avatar';
import { InputCommon } from '@sbercloud/uikit-product-input';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CollapsePanelItem, CollapsePanelItemProps } from '../src';

const meta: Meta = {
  title: 'Not stable/CollapsePanel/Collapse Panel Item',
  component: CollapsePanelItem,
};
export default meta;

const ContentStyled = styled.div`
  margin-top: 20px;
`;

function Template({ ...args }: CollapsePanelItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <CollapsePanelItem
      {...args}
      isCollapsed={isCollapsed}
      handleClick={() => setIsCollapsed(isCollapsed => !isCollapsed)}
      index={0}
      header={<Avatar variant={Avatar.variants.User} size={Avatar.sizes.Large} name='G O' />}
    >
      <ContentStyled>Content</ContentStyled>
      <InputCommon value={'Some text'} onChange={() => {}} />
    </CollapsePanelItem>
  );
}

export const collapsePanelItem: StoryFn<CollapsePanelItemProps> = Template.bind({});
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
