import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SiteCsat, SiteCsatProps } from '../src';

const meta: Meta = {
  title: 'Site/Csat',
  component: SiteCsat,
};
export default meta;

const Template: StoryFn<SiteCsatProps> = ({ ...args }) => <SiteCsat {...args} />;

export const siteCsat: StoryObj<SiteCsatProps> = {
  render: Template,
  args: {
    isLoading: false,
    like: false,
    onSetLike: () => {},
    layoutType: LAYOUT_TYPE.Desktop,
    label: 'Было полезно ?',
    dislikeCommentForm: {
      open: true,
      loadingButton: false,
      dislikeEnabled: false,
      onClickForm: () => {},
      onSubmit: () => {},
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/-LIB--SITE--Product-UI-Kit?node-id=21782-399371&m=dev',
    },
  },
};
