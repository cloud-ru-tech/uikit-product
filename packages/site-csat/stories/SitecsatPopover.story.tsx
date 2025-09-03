import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SiteCsatPopover, SiteCsatPopoverProps } from '../src';

const meta: Meta = {
  title: 'Site/Csat',
  component: SiteCsatPopover,
};
export default meta;

const Template: StoryFn<SiteCsatPopoverProps> = ({ ...args }) => <SiteCsatPopover {...args} />;

export const siteCsatPopover: StoryObj<SiteCsatPopoverProps> = {
  render: Template,
  args: {
    loading: false,
    like: false,
    onSetLike: () => {},
    layoutType: LAYOUT_TYPE.Desktop,
    label: 'Было полезно ?',
    negativeFeedbackForm: {
      open: false,
      onSetOpen: () => {},
    },
    dislikeCommentForm: {
      dislikeEnabled: true,
      loadingButton: false,
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
