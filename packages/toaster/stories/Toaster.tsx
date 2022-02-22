import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-react-button';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toaster as CToaster, ToasterOptions, ToasterProps, customToast, dismissToast, toaster } from '../src';

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
      variant: toaster.variants.Info,
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
    options: { toastId: 'infoCustomId' },
  },
  {
    title: 'ERROR',
    props: {
      variant: toaster.variants.Error,
      title: 'Проблемы с соединением. Данные не перенесены. ',
      subtitle: 'CORS error',
      text: "User=email@sbercloud.ru can't create oneapi jupyter notebook: ['CUSTOMER_ONE_API_NOTEBOOK_LIMIT_REACHED_1_ONLY'] sku_id=None, service_instance_id=None",
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
    options: { autoClose: false, toastId: 'errorCustomId' },
  },
  {
    title: 'IN PROGRESS',
    props: {
      variant: toaster.variants.Info,
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
    options: { toastId: 'inProgressCustomId' },
  },
];

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  grid-auto-columns: max-content;
`;

const LineWrapper = styled.div`
  display: flex;

  > * {
    margin-right: 12px;
  }
`;

const CustomNode = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  background-color: var(${EXPORT_VARS.GRACE[5]});
`;

const Template: Story<ToasterProps & { showActions: boolean; autoClose: boolean }> = ({
  showActions,
  autoClose,
  ...args
}) => (
  <Wrapper>
    <LineWrapper>
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
            { autoClose: autoClose ? undefined : false, toastId: 'customizedCustomId' },
          )
        }
        text='CUSTOMIZED'
      />
      <Button
        variant={Button.variants.Outline}
        onClick={() => dismissToast('customizedCustomId')}
        text='Close CUSTOMIZED'
      />
    </LineWrapper>
    <LineWrapper>
      <Button
        onClick={() => customToast(<CustomNode>custom</CustomNode>, { toastId: 'customNodeId' })}
        text='CUSTOM NODE'
      />
      <Button variant={Button.variants.Outline} onClick={() => dismissToast('customNodeId')} text='Close CUSTOM NODE' />
    </LineWrapper>

    {PREDEFINED_ITEMS.map(({ title, props, options }) => (
      <LineWrapper key={title}>
        <Button
          onClick={() => {
            toaster(props, options);
          }}
          text={title}
        />
        <Button
          variant={Button.variants.Outline}
          onClick={() => {
            dismissToast(options?.toastId);
          }}
          text={`Close ${title}`}
        />
      </LineWrapper>
    ))}

    <CToaster />
  </Wrapper>
);

export const Toaster = Template.bind({});
Toaster.args = {
  variant: toaster.variants.Info,
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
