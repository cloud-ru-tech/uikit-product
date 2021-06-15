import { Button } from '@sbercloud/uikit-react-button';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ModalPreview, ModalPreviewProps } from '../src';

export default {
  title: 'Not stable/Modal',
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
modalPreview.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Eo7qqu8rH4Eg2RGYUrmjra/SberCloud-%E2%86%92-Design_System-iter-2-violet?node-id=4167%3A149885',
  },
};
