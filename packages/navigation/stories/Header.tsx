import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';
import { useRef, useState } from 'react';

import { Badge } from '@sbercloud/uikit-product-badge-private';
import { Divider } from '@sbercloud/uikit-product-divider';
import {
  DocumentationInterfaceSVG,
  NotifyInterfaceSVG,
  QuestionInterfaceSVG,
  SupportInterfaceSVG,
} from '@sbercloud/uikit-product-icons';
import { PredefinedMLSpaceLogo } from '@sbercloud/uikit-product-predefined-icons-private';
import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';
import { useMatchMedia } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  Header,
  HeaderBalanceTooltip,
  HeaderLogo,
  HeaderMenu,
  HeaderProjectSelector,
  HeaderProps,
  HeaderToolbar,
  MobileHeader,
  MobileMenu,
  MobileMenuReference,
} from '../src';

export default {
  title: 'Not stable/Navigation/Header',
  component: Header,
} as Meta;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
  height: 100%;
  width: 100%;
`;

const Logo = styled(PredefinedMLSpaceLogo)`
  > svg {
    width: 180px;
  }
`;

const Tooltip = () => <HeaderBalanceTooltip balance={144_401_810} limit={155_500_000} onRechargeClick={() => {}} />;
const MLSpaceLogo = () => (
  <HeaderLogo>
    <Logo height={16} />
  </HeaderLogo>
);

const ProjectSelector = () => {
  const [workspace, setWorkspace] = useState('workspace-0');

  return (
    <HeaderProjectSelector
      onChange={setWorkspace}
      onCreate={() => {}}
      value={workspace}
      items={[
        {
          label: 'Ultrimax',
          workspaces: [
            { label: 'Zialactic', value: 'workspace-0' },
            { label: 'Zaggles', value: 'workspace-1' },
            { label: 'Isologia', value: 'workspace-2' },
            { label: 'Undertap', value: 'workspace-3' },
            { label: 'Gluid', value: 'workspace-4' },
            { label: 'Insource', value: 'workspace-5' },
          ],
        },
      ]}
    />
  );
};

const Template: Story<HeaderProps> = () => {
  const { isMobile } = useMatchMedia();
  const mobileMenuRef = useRef<MobileMenuReference>(null);

  if (isMobile) {
    return (
      <Wrapper>
        <MobileHeader onMenuClick={target => mobileMenuRef.current?.toggleOpen(target)}>
          <MLSpaceLogo />

          <Tooltip />
        </MobileHeader>
        <MobileMenu ref={mobileMenuRef}>
          <HeaderToolbar.Root>
            <HeaderToolbar.ProfileItem title='Профиль' href='' name='Андрей Иванов' />
            <HeaderToolbar.Item icon={<DocumentationInterfaceSVG />} title='Документация' href='' />
            <HeaderToolbar.Item icon={<SupportInterfaceSVG />} title='Поддержка' href='' />
          </HeaderToolbar.Root>

          <Divider />

          <ProjectSelector />
        </MobileMenu>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        <HeaderMenu.Root title='Платформы'>
          <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='ML Space' href='' />
          <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='Enterprise' href='' />
          <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='SVP' href='' />
          <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='Advanced' href='' />
        </HeaderMenu.Root>

        <MLSpaceLogo />

        <ProjectSelector />

        <Tooltip />

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
};

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
