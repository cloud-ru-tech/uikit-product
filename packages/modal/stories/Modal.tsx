import { Button } from '@sbercloud/uikit-react-button';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Modal, ModalProps } from '../src';

export default {
  title: 'Not stable/Modal',
  component: Modal,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<ModalProps> = ({ ...args }) => {
  const [, /* open */ setOpen] = useState(false);
  const openDrawer = (): void => setOpen(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        {...args}
        zIndex={1}
        appElement={document.body}
        approve={openDrawer}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </>
  );
};

export const modal = Template.bind({});
modal.args = {};
modal.argTypes = {
  disableApproveTooltip: {
    defaultValue: 'Tooltip',
  },
  title: { defaultValue: 'Удаление тега' },
  description: { defaultValue: 'Вы действительно хотите удалить тег «ёлочек»?' },
  approveText: { defaultValue: 'Approve' },
  shouldCloseOnOverlayClick: { defaultValue: false },
  shouldCloseOnEsc: { defaultValue: false },
};
modal.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
