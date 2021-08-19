import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button } from '@sbercloud/uikit-react-button';

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
modal.args = {};
modal.argTypes = {
  disableApproveTooltip: {
    defaultValue: 'Tooltip',
  },
  title: { defaultValue: 'Удаление тега' },
  description: {
    defaultValue:
      'Вы действительно хотите удалить тег «ce394b6a049f525a1cd7ce394b6a049f525a1cd7ce394b6a049f525a1cd7ce394b6a049f525a1cd7ce394b6a049f525a1cd7»?',
  },
  shouldCloseOnOverlayClick: { defaultValue: false },
  shouldCloseOnEsc: { defaultValue: false },
  cancel: {
    defaultValue: () => {},
  },
};
modal.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Eo7qqu8rH4Eg2RGYUrmjra/SberCloud-%E2%86%92-Design_System-iter-2-violet?node-id=1785%3A44522',
  },
};
