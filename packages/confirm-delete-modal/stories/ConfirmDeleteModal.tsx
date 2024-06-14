import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { SwitchRow } from '@sbercloud/uikit-product-switch-row';
import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ConfirmDeleteModal, ConfirmDeleteModalProps } from '../src';

const meta: Meta = {
  title: 'Snack UIkit/Confirm Delete Modal',
  component: ConfirmDeleteModal,
};

type StoryProps = ConfirmDeleteModalProps & {
  switchRowExample: boolean;
  confirmable: boolean;
  customDescription: boolean;
};

function Template({ customDescription, description, switchRowExample, ...args }: StoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(args.open);
  }, [args.open]);

  return (
    <>
      <ButtonFilled label='Удалить' onClick={() => setIsOpen(true)} size='m' />
      <ConfirmDeleteModal
        {...args}
        description={
          <>
            {customDescription ? (
              description
            ) : (
              <div>
                Description content
                <p>
                  For replacement, use the property: ◆Slot... Connect your local component with unique content to this
                  property
                </p>
                <p>
                  The maximum height of the modal window can be equal to the height of the browser view window with
                  margins of 24 px
                </p>
              </div>
            )}
            {switchRowExample && (
              <div>
                <SwitchRow
                  title='Title truncate one line'
                  description='Description multiline'
                  checked={checked}
                  onChange={setChecked}
                />
              </div>
            )}
          </>
        }
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={action('onApprove')}
      />
    </>
  );
}

export const confirmDeleteModal: StoryFn<StoryProps> = Template.bind({});

confirmDeleteModal.args = {
  switchRowExample: false,
  confirmable: true,
  customDescription: false,
  objectType: '<Тип объекта>',
  description: 'Description content',
  confirmText: 'какое-то_очень_длинное_значение_удаляемого_инстанса',
  hideConfirmCopyButton: false,
  mode: 'regular',
  titleTooltip: 'tip',
};

confirmDeleteModal.argTypes = {
  description: {
    type: 'string',
    if: {
      arg: 'customDescription',
      eq: true,
    },
  },
  titleTooltip: {
    type: 'string',
  },
  confirmable: {
    name: '[Stories]: show confirm input',
  },
  confirmText: {
    if: {
      arg: 'confirmable',
      eq: true,
    },
  },
  hideConfirmCopyButton: {
    if: {
      arg: 'confirmable',
      eq: true,
    },
  },
  customDescription: {
    name: '[Stories]: enter custom description',
  },

  switchRowExample: {
    name: '[Stories]: show example modal with switch row',
  },
};

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

export default meta;
