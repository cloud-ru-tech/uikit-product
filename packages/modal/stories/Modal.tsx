import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';
import { InfoOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Link } from '@sbercloud/uikit-product-link';
import { Select } from '@sbercloud/uikit-product-select';
import { ToggleCard, ToggleGroup } from '@sbercloud/uikit-product-toggle-group';
import { TEXT_1_STYLES } from '@sbercloud/uikit-product-typography';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Modal, ModalProps } from '../src';
import { CARDS } from './helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Text1 = styled.div`
  ${TEXT_1_STYLES};
  text-align: center;
`;

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
};
export default meta;

function Template({ ...args }: ModalProps) {
  const [isControlledModalOpen, setIsControlledModalOpen] = useState(false);
  const [isEx1ModalOpen, setEx1ModalOpen] = useState(false);
  const [isEx2ModalOpen, setEx2ModalOpen] = useState(false);
  const [isEx3ModalOpen, setEx3ModalOpen] = useState(false);
  const [isEx4ModalOpen, setEx4ModalOpen] = useState(false);
  const [isEx5ModalOpen, setEx5ModalOpen] = useState(false);

  const [value, setValue] = useState<number[]>();

  const [pending, setPending] = useState(false);

  const closeModal = (): void => {
    if (!pending) {
      setIsControlledModalOpen(false);
      setEx1ModalOpen(false);
      setEx2ModalOpen(false);
      setEx3ModalOpen(false);
      setEx4ModalOpen(false);
      setEx5ModalOpen(false);
    }
  };

  useEffect(() => {
    setIsControlledModalOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <Container>
      <Button
        onClick={() => setIsControlledModalOpen(true)}
        text='Open controlled'
        data-test-id='modal-control-button'
      />
      <Button onClick={() => setEx1ModalOpen(true)} text='Open Example 1' />
      <Button onClick={() => setEx2ModalOpen(true)} text='Open Example 2' data-test-id='modal-ex2-button' />
      <Button onClick={() => setEx3ModalOpen(true)} text='Open Example 3' data-test-id='modal-ex3-button' />
      <Button onClick={() => setEx4ModalOpen(true)} text='Open Example 4' data-test-id='modal-ex3-button' />
      <Button onClick={() => setEx5ModalOpen(true)} text='Open Example 5' data-test-id='modal-ex3-button' />

      <Modal {...args} isOpen={isControlledModalOpen} onClose={closeModal} />

      <Modal
        title='Какая-то форма'
        subtitle='Какой-то подзаголовок к форме'
        titleTooltip={{
          content: 'Какая-то подсказка к форме',
        }}
        isOpen={isEx1ModalOpen}
        onClose={closeModal}
        approveButton={{
          onClick: () => {
            setPending(true);
            setTimeout(() => {
              setPending(false);
              closeModal();
            }, 2000);
          },
          text: 'Подтвердить',
          loading: pending,
        }}
        cancelButton={{
          onClick: closeModal,
        }}
        content={
          <ToggleGroup value={value} onChange={setValue} mode={ToggleGroup.mode.Checkbox}>
            {CARDS.map((item, i) => (
              <ToggleCard {...item} key={i} />
            ))}
          </ToggleGroup>
        }
      />

      <Modal
        data-test-id='modal-test-ex2'
        isOpen={isEx2ModalOpen}
        title='Удалить 12 файлов'
        approveButton={{
          onClick: closeModal,
          text: 'Удалить',
          alarm: true,
        }}
        cancelButton={{ onClick: closeModal }}
        additionalButton={{ onClick: closeModal, text: 'Другое', icon: args.additionalButton?.icon }}
        onClose={closeModal}
        content={
          <ul>
            <li>Удаление большого количества файлов или папок одновременно обрабатывается в фоновом режиме</li>
            <li>Изменения могут вступить в силу с задержкой</li>
          </ul>
        }
      />

      <Modal
        data-test-id='modal-test-ex3'
        isOpen={isEx3ModalOpen}
        title='Какой-то заголовок'
        subtitle='Какой-то подзаголовок к форме'
        titleTooltip={{
          content: 'Какая-то подсказка к форме',
        }}
        approveButton={{
          onClick: closeModal,
          text: 'Принять и продолжить',
          alarm: true,
          loading: true,
        }}
        cancelButton={{ onClick: closeModal, text: 'Вернуться назад' }}
        additionalButton={{ onClick: closeModal, text: 'Другое' }}
        onClose={closeModal}
        content={
          <Text1>
            Для продолжения работы необходимо ознакомиться и принять{' '}
            <Link text='Пользовательское соглашение' href='#' /> маркетплейсов DataHub и AI services
          </Text1>
        }
        align={Modal.aligns.Center}
      />

      <Modal
        data-test-id='modal-test-ex4'
        isOpen={isEx4ModalOpen}
        title='Выберите workspace'
        subtitle='Для начала работы с ML Space необходимо выбрать workspace'
        titleTooltip={{
          content:
            'Workspace - это среда совместного управления данными и артефактами машинного обучения. Создать новый workspace можно в Профиле.',
        }}
        approveButton={{
          onClick: closeModal,
          text: 'Выбрать',
        }}
        cancelButton={{ onClick: closeModal, text: 'На главную' }}
        onClose={closeModal}
        content={
          <Select
            options={[
              { label: 'test', value: 'test' },
              { label: 'test1', value: 'test1' },
            ]}
            type={'large'}
          />
        }
        variant={Modal.variants.Aggressive}
        disableScroll
      />

      <Modal
        data-test-id='modal-test-ex5'
        isOpen={isEx5ModalOpen}
        title='Удалить элемент'
        subtitle='После удаления элемента он станет недоступен'
        approveButton={{
          onClick: closeModal,
          alarm: true,
          text: 'Удалить',
        }}
        cancelButton={{ onClick: closeModal, text: 'Отменить' }}
        onClose={closeModal}
        variant={Modal.variants.Forced}
        disableScroll
      />
    </Container>
  );
}

export const modal: StoryFn<ModalProps> = Template.bind({});

modal.argTypes = {
  size: {
    control: {
      type: 'radio',
    },
    options: Object.values(Modal.sizes),
  },
  align: {
    control: {
      type: 'radio',
    },
    options: Object.values(Modal.aligns),
  },
  variant: {
    control: {
      type: 'radio',
    },
    options: Object.values(Modal.variants),
  },
  disableScroll: {
    name: 'disableScroll',
    description:
      'Use only if available in a Modal with Dropdown, Select, Datepicker, Timepicker. It may be dangerous...',
  },
};

modal.args = {
  title: 'Какая-то форма',
  subtitle: 'Какой-то подзаголовок к форме',
  titleTooltip: {
    content: 'Какая-то подсказка к форме',
  },
  cancelButton: {
    onClick: () => {},
    text: 'Удалить',
  },
  approveButton: {
    onClick: () => {},
    text: 'Подтвердить',
    disabledTooltip: {
      content: 'Нет доступа',
    },
    loading: false,
    disabled: false,
    alarm: false,
  },
  additionalButton: {
    onClick: () => {},
    text: 'Другое',
    disabled: false,
    disabledTooltip: {
      content: 'Нет доступа',
    },
    icon: <InfoOutlineInterfaceSVG />,
  },
  disableScroll: false,
  size: Modal.sizes.Small,
  align: Modal.aligns.Sided,
  variant: Modal.variants.Regular,
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?',
};

modal.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=5583%3A75932&t=Ga5W1WhnFvUkVcAS-0',
  },
  badges: [BADGE.STABLE],
};
