import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { FolderInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Link, LinkProps } from '../src';
import { Variant } from '../src/components/constants';

const Container = styled.div<{ variant: Variant }>`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 10%;
  background-color: var(${themeVars.sys.neutral.background2Level});
`;

const prefixIcons = {
  FolderInterfaceSVG: <FolderInterfaceSVG />,
  none: undefined,
};

export default {
  title: 'Components/Link',
  component: Link,
} as Meta;

const Template: StoryFn<LinkProps> = ({ ...args }) => (
  <Container variant={args.variant || Variant.OnPrimary}>
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
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1492%3A41864',
  },
  badges: [BADGE.DEPRECATED],
  snackUiLink: 'https://frontend.cp.sbercloud.tech/snack/?path=/story/components-link--link',
};
