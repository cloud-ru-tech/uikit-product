import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { Button } from 'components';

import { toast, ToastContainer, ToastOptions } from './ToastContainer';

import { ToastProps } from '../../helperComponents/Toast';

export default {
  title: 'Components/Toast',
} as Meta;

const PREDEFINED_ITEMS: {
  title: string;
  props: ToastProps;
  options?: ToastOptions;
}[] = [
  {
    title: 'INFO',
    props: {
      variant: 'info',
      title: 'Перенос данных завершен',
      subtitle: 'Проект с очень длинным названием',
      closeButton: true,
      text:
        'Привет! После запуска задачи на расчет новой модели посмотри, пожалуйста, что-нибудь еще',
      actions: [
        {
          title: 'Пауза',
          onClick: () => {},
        },
        {
          title: 'Отменить',
          onClick: () => {},
        },
      ],
    },
  },
  {
    title: 'ERROR',
    props: {
      variant: 'error',
      title: 'Проблемы с соединением. Данные не перенесены. ',
      subtitle: 'CORS error',
      text:
        "Access to XMLHttpRequest at 'https://console.sbercloud.ru' (redirected from 'https://api.sbercloud.ru') from origin 'https://console.ru' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
      closeButton: true,
      actions: [
        {
          title: 'Скопировать',
          onClick: () => {},
        },
        {
          title: 'Сообщить о проблеме',
          onClick: () => {},
        },
      ],
    },
    options: { autoClose: false },
  },
  {
    title: 'IN PROGRESS',
    props: {
      variant: 'info',
      progress: true,
      title: 'Создание workspace',
      text: 'Процесс может занять несколько минут',
      closeButton: true,
      actions: [
        {
          title: 'Пауза',
          onClick: () => {},
        },
        {
          title: 'Закрыть',
          onClick: (_, closeToast) => closeToast && closeToast(),
        },
      ],
    },
  },
];

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  grid-auto-columns: max-content;
`;

const Template: Story<
  ToastProps & { showActions: boolean; autoClose: boolean }
> = ({ showActions, autoClose, ...args }) => (
  <Wrapper>
    <Button
      onClick={() =>
        toast(
          {
            ...args,
            actions: showActions
              ? [
                  {
                    title: 'Пауза',
                    onClick: () => {},
                  },
                  {
                    title: 'Отменить',
                    onClick: () => {},
                  },
                ]
              : undefined,
          },
          { autoClose: autoClose ? undefined : false },
        )
      }
    >
      CUSTOMIZED
    </Button>

    {PREDEFINED_ITEMS.map(({ title, props, options }) => (
      <Button key={title} onClick={() => toast(props, options)}>
        {title}
      </Button>
    ))}

    <ToastContainer />
  </Wrapper>
);

export const Toast = Template.bind({});
Toast.args = {
  variant: 'info',
  title: 'Lorem ipsum dolor sit amet',
  subtitle: 'consectetur adipiscing elit',
  text: 'Suspendisse ac lectus mattis, ultrices mauris eget, volutpat tellus',
  progress: false,
  closeButton: true,
  autoClose: true,
};
Toast.argTypes = {
  variant: {
    control: {
      type: 'radio',
      options: ['info', 'error'],
    },
  },
  title: {
    control: {
      type: 'text',
    },
  },
  subtitle: {
    control: {
      type: 'text',
    },
  },
  progress: {
    control: {
      type: 'boolean',
    },
  },
  closeButton: {
    control: {
      type: 'boolean',
    },
  },
  autoClose: {
    control: {
      type: 'boolean',
    },
  },
  showActions: {
    control: {
      type: 'boolean',
    },
  },
};
