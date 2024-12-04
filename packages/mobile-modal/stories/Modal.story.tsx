import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import * as Icons from '@sbercloud/uikit-product-icons';
import { ButtonFilled } from '@snack-uikit/button';
import { FieldSlider } from '@snack-uikit/fields';
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
  const [open2, setOpen2] = useState(false);

  const closeModal = () => setOpen(false);
  const closeModal2 = () => setOpen2(false);

  return (
    <div>
      <ButtonFilled label={'Open modal'} onClick={() => setOpen(!open)} />

      <MobileModal
        {...args}
        open={openProp ?? open}
        onClose={closeModal}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        approveButton={!args.approveButton ? undefined : { ...args.approveButton, onClick: closeModal }}
        cancelButton={!args.cancelButton ? undefined : { ...args.cancelButton, onClick: closeModal }}
        additionalButton={!args.additionalButton ? undefined : { ...args.additionalButton, onClick: closeModal }}
        content={<ButtonFilled label={'Open modal #2'} onClick={() => setOpen2(!open2)} />}
      />

      <MobileModal
        {...args}
        open={open2}
        onClose={closeModal2}
        approveButton={{ ...args.approveButton, onClick: closeModal2 }}
        cancelButton={!args.cancelButton ? undefined : { ...args.cancelButton, onClick: closeModal2 }}
        additionalButton={!args.additionalButton ? undefined : { ...args.additionalButton, onClick: closeModal2 }}
        content={
          <>
            Demo content
            <br /> <br />
            For replacement, use the property: ◆Slot... Connect your local component with unique content to this
            property
            <br /> <br />
            The maximum height of the modal window can be equal to the height of the browser view window with margins of
            24 px
            <br /> <br />
            Demo content
            <br /> <br />
            For replacement, use the property: ◆Slot... Connect your local component with unique content to this
            property
            <br /> <br />
            The maximum height of the modal window can be equal to the height of the browser view window with margins of
            24 px
            <br /> <br />
            Demo content
            <br /> <br />
            For replacement, use the property: ◆Slot... Connect your local component with unique content to this
            property
            <br /> <br />
            The maximum height of the modal window can be equal to the height of the browser view window with margins of
            24 px
            <br /> <br />
            <FieldSlider min={1} max={100} step={1} marks={{ 1: '1', 25: '25', 50: '50', 75: '75', 100: '100' }} />
            Demo content
            <br /> <br />
            For replacement, use the property: ◆Slot... Connect your local component with unique content to this
            property
            <br /> <br />
            The maximum height of the modal window can be equal to the height of the browser view window with margins of
            24 px
            <br /> <br />
            Demo content
            <br /> <br />
            For replacement, use the property: ◆Slot... Connect your local component with unique content to this
            property
            <br /> <br />
            The maximum height of the modal window can be equal to the height of the browser view window with margins of
            24 px
            <br /> <br />
            Demo content
            <br /> <br />
            For replacement, use the property: ◆Slot... Connect your local component with unique content to this
            property
            <br /> <br />
            The maximum height of the modal window can be equal to the height of the browser view window with margins of
            24 px
          </>
        }
      />
    </div>
  );
}

export const modal: StoryObj<ModalStoryProps> = {
  render: Template,

  args: {
    title: 'Headline',
    titleTooltip: 'tooltip',
    subtitle: 'Subheading',
    content: (
      <>
        Demo content
        <br /> <br />
        For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
        <br /> <br />
        The maximum height of the modal window can be equal to the height of the browser view window with margins of 24
        px
        <br /> <br />
        Demo content
        <br /> <br />
        For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
        <br /> <br />
        The maximum height of the modal window can be equal to the height of the browser view window with margins of 24
        px
        <br /> <br />
        Demo content
        <br /> <br />
        For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
        <br /> <br />
        The maximum height of the modal window can be equal to the height of the browser view window with margins of 24
        px
        <br /> <br />
        <div>
          <FieldSlider min={1} max={100} step={1} marks={{ 1: '1', 25: '25', 50: '50', 75: '75', 100: '100' }} />
        </div>
        Demo content
        <br /> <br />
        For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
        <br /> <br />
        The maximum height of the modal window can be equal to the height of the browser view window with margins of 24
        px
        <br /> <br />
        Demo content
        <br /> <br />
        For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
        <br /> <br />
        The maximum height of the modal window can be equal to the height of the browser view window with margins of 24
        px
        <br /> <br />
        Demo content
        <br /> <br />
        For replacement, use the property: ◆Slot... Connect your local component with unique content to this property
        <br /> <br />
        The maximum height of the modal window can be equal to the height of the browser view window with margins of 24
        px
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
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=12599-164564&m=auto',
    },
  },
};
