import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';
import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AdaptiveReleaseNotesModal, ReleaseNotesModalProps } from '../src/components';
import sampleNewsImage1 from './assets/img/sample-news-1.jpg';
import sampleNewsImage2 from './assets/img/sample-news-2.jpg';
import sampleNewsImage3 from './assets/img/sample-news-3.jpg';
import { LAYOUT_TYPE } from './constants';

const meta: Meta = {
  title: 'Console/Modal Predefined/Release Notes Modal',
  component: AdaptiveReleaseNotesModal,
};

type StoryProps = ReleaseNotesModalProps & {
  layoutType: ValueOf<typeof LAYOUT_TYPE>;
  singleItemMode: boolean;
  readLaterEnabled: boolean;
  noDataMode: boolean;
  errorStateActionEnabled: boolean;
};

const sampleNews: ReleaseNotesModalProps['items'] = [
  {
    title: 'Тёмная тема',
    description:
      'Мы рады сообщить, что в вашем личном кабинете теперь доступна новая функция — тёмная тема! Это обновление создано для того, чтобы сделать использование нашего сервиса еще более удобным и приятным для глаз.\n\n  ' +
      'Для активации нужной темы зайдите на страницу профиля, перейдите в раздел "Тема интерфейса" и выберите подходящую тему. Мы уверены, что это нововведение сделает ваш опыт использования нашего сервиса еще более комфортным.\n\n  ' +
      '[Настроить тему](https://frontend.cp.sbercloud.tech/snack/)',
    image: { src: sampleNewsImage1, alt: 'Intro' },
  },
  {
    title: 'Доступность',
    description:
      'В зависимости от пола и географии, дальтонизм может затронуть в среднем 8% мужчин и до 0,5% женщин. Наша предыдущая тема дальтонизма была разделена на две новые темы:\n\n  ' +
      '* Светлая/тёмная протанопия и дейтеранопия для дальтонизма на красный/зеленый цвет.\n\n  ' +
      '* Светлая/тёмная тританопия для дальтонизма на синий/желтый цвет.\n\n  ' +
      '[Документация](https://frontend.cp.sbercloud.tech/snack/)  •  [Оставить отзыв](https://frontend.cp.sbercloud.tech/snack/)',
    image: { src: sampleNewsImage2, alt: 'Stats' },
  },
  {
    title: 'Руководство: Как писать статью?',
    description:
      '###### Пошаговое руководство\n\n  ' +
      'Собравшись с мыслями и создав файл в Word, Google Docs или другом текстовом редакторе, автор зачастую впадает в ступор: он не знает, о чем писать, с чего начать, какой должна быть структура и подача материала. Причина этого — незнание алгоритма создания текстов. Поможет в решении проблемы пошаговое руководство по тому, как писать статью для публикации.\n\n  ' +
      '###### Шаг 1: выбор темы материала и ее анализ\n\n  ' +
      'Собравшись с мыслями и создав файл в Word, Google Docs или другом текстовом редакторе, автор зачастую впадает в ступор: он не знает, о чем писать, с чего начать, какой должна быть структура и подача материала. Причина этого — незнание алгоритма создания текстов. Поможет в решении проблемы пошаговое руководство по тому, как писать статью для публикации. Собравшись с мыслями и создав файл в Word, Google Docs или другом текстовом редакторе, автор зачастую впадает в ступор: он не знает, о чем писать, с чего начать, какой должна быть структура и подача материала. Причина этого — незнание алгоритма создания текстов. Поможет в решении проблемы пошаговое руководство по тому, как писать статью для публикации.\n\n  ' +
      '###### Шаг 1: выбор темы материала и ее анализ\n\n  ' +
      'Собравшись с мыслями и создав файл в Word, Google Docs или другом текстовом редакторе, автор зачастую впадает в ступор: он не знает, о чем писать, с чего начать, какой должна быть структура и подача материала. Причина этого — незнание алгоритма создания текстов. Поможет в решении проблемы пошаговое руководство по тому, как писать статью для публикации.\n\n  ' +
      '[Документация](https://frontend.cp.sbercloud.tech/snack/)  •  [Оставить отзыв](https://frontend.cp.sbercloud.tech/snack/)',
    image: { src: sampleNewsImage3, alt: 'stepByStep' },
  },
];

function Template({
  singleItemMode,
  readLaterEnabled,
  loading,
  noDataMode,
  errorStateActionEnabled,
  ...args
}: StoryProps) {
  const [isOpen, setIsOpen] = useState(args.open);

  useEffect(() => {
    setIsOpen(args.open);
  }, [args.open]);

  const handleClose = () => setIsOpen(false);

  const items = useMemo(() => {
    if (loading) {
      return [];
    }

    if (singleItemMode) {
      return sampleNews.slice(0, 1);
    }

    return sampleNews;
  }, [loading, singleItemMode]);

  return (
    <>
      <ButtonFilled label='Открыть' onClick={() => setIsOpen(true)} size='m' />
      <AdaptiveReleaseNotesModal
        {...args}
        open={isOpen}
        onClose={handleClose}
        items={noDataMode ? [] : items}
        onReadLaterClick={readLaterEnabled ? handleClose : undefined}
        loading={loading}
        onDataErrorRetryClick={errorStateActionEnabled ? () => alert('Data reloaded') : undefined}
      />
    </>
  );
}

export const releaseNotesModal: StoryObj<StoryProps> = {
  render: Template,

  args: {
    layoutType: LAYOUT_TYPE.desktop,
    singleItemMode: false,
    readLaterEnabled: true,
    noDataMode: false,
    open: false,
    loading: false,
    dataError: false,
    errorStateActionEnabled: true,
  },

  argTypes: {
    layoutType: {
      name: '[Stories]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
    singleItemMode: {
      name: '[Story]: Single item mode',
      type: 'boolean',
    },
    readLaterEnabled: {
      name: '[Story]: Read Later button enabled',
      type: 'boolean',
    },
    noDataMode: {
      name: '[Story]: No data mode',
      type: 'boolean',
    },
    errorStateActionEnabled: {
      name: '[Story]: Error state action enabled',
      type: 'boolean',
      if: { arg: 'dataError', eq: true },
    },
    onClose: { table: { disable: true } },
    onReadLaterClick: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/ee7vftqbCedgoIe4MML0Uw/Product-components?m=auto&node-id=15070-729&t=KNG9NDreqWViuFuL-1',
    },
  },
};

export default meta;
