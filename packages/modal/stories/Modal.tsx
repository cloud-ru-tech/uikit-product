import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Modal, ModalProps } from '../src';

export default {
  title: 'Not stable/Modal/Modal',
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
      <Button onClick={openModal} text='Open Modal' />
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
modal.args = {
  disableApproveTooltip: 'Tooltip',
  title: 'Удаление тега',
  description:
    'Вы действительно хотите удалить тег «ce394b6a049f525a1cd7ce394b6a049f525a1cd7ce394b6a049f525a1cd7ce394b6a049f525a1cd7ce394b6a049f525a1cd7»?',
  shouldCloseOnOverlayClick: false,
  shouldCloseOnEsc: false,
  cancel: () => {},
};
modal.argTypes = {};
modal.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=202%3A4860',
  },
};
