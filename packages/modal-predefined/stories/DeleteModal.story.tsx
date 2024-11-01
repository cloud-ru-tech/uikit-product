import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';
import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AdaptiveDeleteModal, DefaultDeleteModalBody, DeleteModalProps } from '../src';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack UIkit/Modal Predefined/Delete Modal',
  component: AdaptiveDeleteModal,
};

type StoryProps = DeleteModalProps & {
  layoutType: ValueOf<typeof LAYOUT_TYPE>;
  switchRowExample: boolean;
  confirmable: boolean;
  customDescription: boolean;
};

function Template({ customDescription, description, switchRowExample, ...args }: StoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(args.open);
  }, [args.open]);

  return (
    <>
      <ButtonFilled label='Удалить' onClick={() => setIsOpen(true)} size='m' />
      <AdaptiveDeleteModal
        {...args}
        description={
          <DefaultDeleteModalBody
            content={
              customDescription ? (
                description
              ) : (
                <div className={styles.demoContent}>
                  <p>Description content</p>
                  <p>
                    For replacement, use the property: ◆Slot... Connect your local component with unique content to this
                    property
                  </p>
                  <p>
                    The maximum height of the modal window can be equal to the height of the browser view window with
                    margins of 24 px
                  </p>
                </div>
              )
            }
            settings={
              switchRowExample
                ? {
                    items: [
                      { id: '1', title: 'Title truncate one line', description: 'Description multiline' },
                      { id: '2', title: 'Title truncate one line', description: 'Description multiline' },
                    ],
                  }
                : undefined
            }
          />
        }
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={action('onApprove')}
      />
    </>
  );
}

export const deleteModal: StoryObj<StoryProps> = {
  render: Template,

  args: {
    layoutType: LAYOUT_TYPE.desktop,
    switchRowExample: false,
    confirmable: true,
    customDescription: false,
    objectType: '<Тип объекта>',
    description: 'Description content',
    confirmText: 'какое-то_очень_длинное_значение_удаляемого_инстанса',
    hideConfirmCopyButton: false,
    mode: 'regular',
    titleTooltip: 'tip',
    subtitle: 'subtitle',
  },

  argTypes: {
    layoutType: {
      name: '[Stories]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
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
    subtitle: {
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
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/xutZzH1SnasFgFQD193iTu/%5BLIB%5D-Platform-DS-%E2%88%99-UX-Patterns?type=design&node-id=18627-138121&mode=design&t=2ljyNMWGHWcykSAy-0',
    },
  },
};

export default meta;
