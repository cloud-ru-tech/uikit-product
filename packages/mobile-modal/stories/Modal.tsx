import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import * as Icons from '@sbercloud/uikit-product-icons';
import { ButtonFilled } from '@snack-uikit/button';
import { IconPredefinedProps } from '@snack-uikit/icon-predefined';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileModal, MobileModalProps } from '../src';
import { ALIGN, MODE, SIZE } from '../src/constants';

const meta: Meta = {
  title: 'Mobile/Modal/Modal',
  component: MobileModal,
};
export default meta;

type ModalStoryProps = MobileModalProps & {
  icon: IconPredefinedProps['icon'];
  showImage: boolean;
  showIcon: boolean;
};

function Template({ open: openProp, ...args }: ModalStoryProps) {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <div>
      <ButtonFilled label={'Open modal'} onClick={() => setOpen(!open)} />

      <MobileModal
        {...args}
        open={openProp ?? open}
        onClose={closeModal}
        approveButton={{ ...args.approveButton, onClick: closeModal }}
        cancelButton={!args.cancelButton ? undefined : { ...args.cancelButton, onClick: closeModal }}
        additionalButton={!args.additionalButton ? undefined : { ...args.additionalButton, onClick: closeModal }}
      />
    </div>
  );
}

export const modal: StoryFn<ModalStoryProps> = Template.bind({});

modal.args = {
  title: 'Headline',
  titleTooltip: 'tooltip',
  subtitle: 'Subheading',
  content: (
    <>
      Demo content
      <br /> <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br /> <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br /> <br />
      Demo content
      <br /> <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br /> <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br /> <br />
      Demo content
      <br /> <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br /> <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br /> <br />
      Demo content
      <br /> <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br /> <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br /> <br />
      Demo content
      <br /> <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br /> <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
      <br /> <br />
      Demo content
      <br /> <br />
      For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
      <br /> <br />
      The maximum height of the modal window can be equal to the height of the browser view window with margins of 24 px
    </>
  ),
  size: SIZE.Auto,
  align: ALIGN.Default,
  mode: MODE.Regular,
  approveButton: {
    label: 'Primary',
  },
  cancelButton: {
    label: 'Secondary',
  },
  additionalButton: {
    label: 'Tertiary',
  },
  showIcon: false,
  showImage: false,
  icon: Icons.PlaceholderSVG,
  disclaimer: {
    text: 'Disclaimer Text Written in no more than 2 lines',
    link: {
      text: 'Link text',
      href: '#',
    },
  },
};

modal.argTypes = {};

modal.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=12599-164564&m=auto',
  },
};
