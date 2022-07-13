import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';

import { Badge } from '@sbercloud/uikit-product-badge-private';
import {
  DocumentationInterfaceSVG,
  NotifyInterfaceSVG,
  QuestionInterfaceSVG,
  SupportInterfaceSVG,
} from '@sbercloud/uikit-product-icons';
import { PredefinedMLSpaceLogo } from '@sbercloud/uikit-product-predefined-icons-private';
import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Header, HeaderBalanceTooltip, HeaderLogo, HeaderMenu, HeaderProps, HeaderToolbar } from '../src';

export default {
  title: 'Not stable/Navigation/Header',
  component: Header,
} as Meta;

const Wrapper = styled.div`
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
  border-radius: 24px;
  padding: 20px;
`;

const Template: Story<HeaderProps> = () => (
  <Wrapper>
    <Header>
      <HeaderMenu.Root title='Платформы'>
        <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='ML Space' href='' />
        <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='Enterprise' href='' />
        <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='SVP' href='' />
        <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='Advanced' href='' />
      </HeaderMenu.Root>
      <HeaderLogo>
        <PredefinedMLSpaceLogo height={16} />
      </HeaderLogo>
      <HeaderBalanceTooltip balance={144_401_810} limit={155_500_000} />
      <HeaderToolbar.Root>
        <HeaderToolbar.Item
          icon={
            <Badge number={2} type={Badge.types.Alert}>
              <NotifyInterfaceSVG />
            </Badge>
          }
          title='Уведомления'
          onClick={() => {}}
        />
        <HeaderToolbar.Item icon={<DocumentationInterfaceSVG />} title='Документация' href='' />
        <HeaderToolbar.Item icon={<SupportInterfaceSVG />} title='Поддержка' href='' />
        <HeaderToolbar.ProfileMenu name='Андрей Иванов'>
          <HeaderToolbar.ProfileMenuAvatarItem title='Профиль' href='' />
          <HeaderToolbar.ProfileMenuItem icon={<QuestionInterfaceSVG />} title='Выход' href='' />
        </HeaderToolbar.ProfileMenu>
      </HeaderToolbar.Root>
    </Header>
  </Wrapper>
);

export const header = Template.bind({});
header.args = {};
header.argTypes = {};
header.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=802%3A0',
  },
};
