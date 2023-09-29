import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@sbercloud/uikit-product-button';
import { DataHubDisplaySVG } from '@sbercloud/uikit-product-icons';
import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { H3_STYLES } from '@sbercloud/uikit-product-typography';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeroBanner, HeroBannerProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Hero Banner',
  component: HeroBanner,
};
export default meta;

function Template({ ...args }: HeroBannerProps) {
  return <HeroBanner {...args} />;
}

const bannerClassName = css`
  /* stylelint-disable-next-line color-named */
  color: white;
  /* stylelint-disable-next-line color-named */
  fill: white;
  /* stylelint-disable-next-line color-no-hex */
  background-color: #5558fa;
`;

const buttonClassName = css`
  margin-top: 32px;
`;

const ProductWrap = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 100px;
  margin-bottom: 32px;
  background: var(${EXPORT_VARS.WHITE_ALFA[16]});
`;

const ProductText = styled.h3`
  ${H3_STYLES};
  margin-left: 12px;
`;

export const heroBanner: StoryFn<HeroBannerProps> = Template.bind({});
heroBanner.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  title: 'ML Space DataHub',
  className: bannerClassName,
  productBadge: (
    <ProductWrap>
      <DataHubDisplaySVG />
      <ProductText>DataHub</ProductText>
    </ProductWrap>
  ),
  button: (
    <Button
      onClick={() => {}}
      text={'Каталог контента'}
      variant={Button.variants.OnAccent}
      className={buttonClassName}
    />
  ),
};
heroBanner.argTypes = {};
heroBanner.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=9675%3A128136',
  },
  badges: [BADGE.BETA],
};
