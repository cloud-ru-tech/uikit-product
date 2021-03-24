import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from 'components/Button';

import { Modal, IModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta;

const Template: Story<IModalProps> = ({ ...args }) => {
  const [, /* open */ setOpen] = useState(false);
  const openDrawer = (): void => setOpen(true);
  // const closeDrawer = (): void => setOpen(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        zIndex={1}
        // onRequestClose={closeModal}
        appElement={document.body}
        title='Удаление тега'
        description='Вы действительно хотите удалить тег «ёлочек»?'
        approve={openDrawer}
        approveText='Drawer'
        {...args}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // cancel={(): void => {
        //   console.log("cancel");
        // }}
      />
    </>
  );
};

export const modal = Template.bind({});
modal.args = {};
modal.argTypes = {};
