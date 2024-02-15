import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';
import { TruncateString } from '@snack-uikit/truncate-string';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ConfirmDeleteModal, ConfirmDeleteModalProps } from '../src';

const meta: Meta = {
  title: 'Snack UIkit/Confirm Delete Modal',
  component: ConfirmDeleteModal,
};
export default meta;

function Template({ ...args }: ConfirmDeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(args.open);
  }, [args.open]);

  return (
    <>
      <ButtonFilled label='Удалить' onClick={() => setIsOpen(true)} size='m' />
      <ConfirmDeleteModal
        {...args}
        subtitle={
          <>
            Вы действительно хотите удалить
            <TruncateString text={`${args.targetName}?`} variant={'middle'} hideTooltip />
          </>
        }
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onApprove={action('onApprove')}
      />
    </>
  );
}

export const confirmDeleteModal: StoryFn<ConfirmDeleteModalProps> = Template.bind({});

confirmDeleteModal.args = {
  title: 'Удаление',
  targetName: 'какое-то_очень_длинное_значение_удаляемого_инстанса',
};

confirmDeleteModal.argTypes = {};

confirmDeleteModal.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/xutZzH1SnasFgFQD193iTu/%5BLIB%5D-Platform-DS-%E2%88%99-UX-Patterns?type=design&node-id=18627-138121&mode=design&t=2ljyNMWGHWcykSAy-0',
  },
};
