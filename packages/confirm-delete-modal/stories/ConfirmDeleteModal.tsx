import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

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

  return (
    <>
      <Button text='Удалить' onClick={() => setIsOpen(true)} />

      <ConfirmDeleteModal
        title={args.title}
        target={args.target}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onApprove={action('onApprove')}
      />
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
    //TODO: update to the correct one
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
