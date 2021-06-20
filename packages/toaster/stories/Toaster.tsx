import { styled } from '@linaria/react';
import { Button } from '@sbercloud/uikit-react-button';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toaster as CToaster, ToasterOptions, ToasterProps, toaster } from '../src';

export default {
  title: 'Not stable/Toaster',
} as Meta;

const PREDEFINED_ITEMS: {
  title: string;
  props: ToasterProps;
  options?: ToasterOptions;
}[] = [
  {
    title: 'INFO',
    props: {
      variant: CToaster.variants.Info,
      title: 'Перенос данных завершен',
      subtitle: 'Проект с очень длинным названием',
      closeButton: true,
      text: 'Привет! После запуска задачи на расчет новой модели посмотри, пожалуйста, что-нибудь еще',
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
      variant: CToaster.variants.Error,
      title: 'Проблемы с соединением. Данные не перенесены. ',
      subtitle: 'CORS error',
      text: "Access to XMLHttpRequest at 'https://console.sbercloud.ru' (redirected from 'https://api.sbercloud.ru') from origin 'https://console.ru' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
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
      variant: CToaster.variants.Info,
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
          onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, closeToast?: () => void) =>
            closeToast && closeToast(),
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

const Template: Story<ToasterProps & { showActions: boolean; autoClose: boolean }> = ({
  showActions,
  autoClose,
  ...args
}) => (
  <Wrapper>
    <Button
      onClick={() =>
        toaster(
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
      <Button key={title} onClick={() => toaster(props, options)}>
        {title}
      </Button>
    ))}

    <CToaster />
  </Wrapper>
);

export const Toaster = Template.bind({});
Toaster.args = {
  variant: CToaster.variants.Info,
  title: 'Lorem ipsum dolor sit amet',
  subtitle: 'consectetur adipiscing elit',
  text: 'Suspendisse ac lectus mattis, ultrices mauris eget, volutpat tellus',
  progress: false,
  closeButton: true,
  autoClose: true,
};
Toaster.argTypes = {
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
Toaster.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
