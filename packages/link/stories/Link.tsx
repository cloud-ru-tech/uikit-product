import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { FolderInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Link, LinkProps } from '../src';
import { Variant } from '../src/components/constants';

const Container = styled.div<{ variant: Variant; theme: Themes }>`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10%;
  background-color: ${({ variant, theme }) =>
    variant === Variant.OnPrimary && ['purple', 'green'].includes(theme) ? '#ffffff' : '#333333'};
`;

const prefixIcons = {
  FolderInterfaceSVG: <FolderInterfaceSVG />,
  none: undefined,
};

export default {
  title: 'Components/Link',
  component: Link,
} as Meta;

const Template: Story<LinkProps> = ({ ...args }, { globals: { theme } }) => (
  <Container variant={args.variant || Variant.OnPrimary} theme={theme}>
    <Link {...args} />
  </Container>
);

export const link = Template.bind({});
link.args = {
  text: 'Click me!',
  href: window.location.href.replace(/&args.*/g, ''),
  target: '_self',
  prefixIcon: <FolderInterfaceSVG />,
  showSuffixIcon: true,
};
link.argTypes = {
  prefixIcon: {
    options: Object.keys(prefixIcons),
    mapping: prefixIcons,
    control: { type: 'radio' },
  },
  target: {
    control: {
      type: 'text',
    },
  },
};
link.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1492%3A41864',
  },
  badges: [BADGE.STABLE],
};
