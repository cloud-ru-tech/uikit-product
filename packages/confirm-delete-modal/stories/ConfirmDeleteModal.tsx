import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ConfirmDeleteModal, ConfirmDeleteModalProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Confirm Delete Modal',
  component: ConfirmDeleteModal,
};
export default meta;

function Template({ ...args }: ConfirmDeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <>
      <Button text='Удалить' onClick={() => setIsOpen(true)} />
      <ConfirmDeleteModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} onApprove={action('onApprove')} />
    </>
  );
}

export const confirmDeleteModal: StoryFn<ConfirmDeleteModalProps> = Template.bind({});

confirmDeleteModal.args = {
  title: 'Удаление',
  target: {
    name: 'запись',
    value: 'recordValue',
  },
};

confirmDeleteModal.argTypes = {};

confirmDeleteModal.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/xutZzH1SnasFgFQD193iTu/%5BLIB%5D-Platform-DS-%E2%88%99-UX-Patterns?type=design&node-id=18627-138121&mode=design&t=2ljyNMWGHWcykSAy-0',
  },
};
