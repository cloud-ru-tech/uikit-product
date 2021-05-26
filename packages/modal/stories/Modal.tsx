import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button } from '@sbercloud/uikit-react-button';

import { Modal, ModalProps } from '../src';

export default {
  title: 'Components/Modal',
  component: Modal,
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
