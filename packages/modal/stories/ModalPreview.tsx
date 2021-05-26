import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button } from '@sbercloud/uikit-react-button';

import { ModalPreview, ModalPreviewProps } from '../src';

export default {
  title: 'Components/Modal',
  component: ModalPreview,
} as Meta;

const Template: Story<ModalPreviewProps> = ({ ...args }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <ModalPreview
        {...args}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        appElement={document.body}
        title='Screenshot 2020-10-30 at 15.22.41.png'
        content={
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/440px-Wikipedia-logo-v2-en.svg.png'
            alt=''
          />
        }
      />
    </>
  );
};

export const modalPreview = Template.bind({});
modalPreview.args = {};
modalPreview.argTypes = {};
