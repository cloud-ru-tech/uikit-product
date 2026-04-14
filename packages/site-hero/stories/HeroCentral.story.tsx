import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { ComponentProps, useMemo } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeroCentral } from '../src';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Hero/Hero Central',
  component: HeroCentral,
};
export default meta;

type HeroCentralProps = ComponentProps<typeof HeroCentral>;

type StoryProps = HeroCentralProps & {
  showButtons: boolean;
  showSecondaryButton: boolean;
  showAnchors: boolean;
  showTooltip: boolean;
};

const handleClickAnchor = () => window.alert('Clicked!');

const BREADCRUMBS: HeroCentralProps['breadcrumbs'] = [
  { id: 'main-page', label: 'Главная', href: '/' },
  { id: 'solutions', label: 'Решения', href: '/solutions' },
  { id: 'hero-central', label: 'Hero Central' },
];

const ANCHORS: NonNullable<HeroCentralProps['anchors']> = [
  {
    id: 'advantages',
    text: 'Преимущества',
    onClick: handleClickAnchor,
  },
  {
    id: 'cases',
    text: 'Кейсы',
    onClick: handleClickAnchor,
  },
  {
    id: 'faq',
    text: 'FAQ',
    onClick: handleClickAnchor,
  },
];

const Template: StoryFn<StoryProps> = ({ showButtons, showSecondaryButton, showAnchors, showTooltip, ...args }) => {
  const buttons = useMemo(() => {
    const sampleButtons: NonNullable<HeroCentralProps['buttons']> = [
      {
        text: 'Подключить',
        uniqueId: 'primary-button',
        style: 'filled',
        onClick: handleClickAnchor,
      },
    ];

    if (showSecondaryButton) {
      sampleButtons.push({
        text: 'Подробнее',
        uniqueId: 'secondary-button',
        style: 'outline',
        link: 'https://cloud.ru',
      });
    }

    return sampleButtons;
  }, [showSecondaryButton]);

  return (
    <div className={cn(styles.body, styles.fullPageHeight)}>
      <div className={styles.wrapper}>
        <HeroCentral
          {...args}
          breadcrumbs={BREADCRUMBS}
          buttons={showButtons ? buttons : undefined}
          anchors={showAnchors ? ANCHORS : undefined}
          tooltipText={
            showTooltip
              ? 'Пример подсказки: По объему выручки AI-сервисов за 2025 год (по данным CNews Analytics), рейтинг игроков PaaS за 2025 год по выручке (по данным iKS-Consulting), рейтинг игроков IaaS по выручке за 2025 год (по данным iKS-Consulting).'
              : undefined
          }
        />
      </div>
    </div>
  );
};

export const heroCentral: StoryObj<StoryProps> = {
  render: Template,
  args: {
    layoutType: LAYOUT_TYPE.Desktop,
    title: 'Cloud.ru — лидер <br/>на рынке облачных и AI-сервисов',
    subtitle: 'Цифровая среда для работы с GenAI',
    showButtons: true,
    showSecondaryButton: true,
    showAnchors: true,
    showTooltip: true,
    tooltipPlacement: 'top-end',
  },
  argTypes: {
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
    showButtons: {
      name: '[Story]: show buttons',
      control: { type: 'boolean' },
    },
    showSecondaryButton: {
      name: '[Story]: show secondary button',
      control: { type: 'boolean' },
      if: { arg: 'showButtons', eq: true },
    },
    showAnchors: {
      name: '[Story]: show anchors',
      control: { type: 'boolean' },
    },
    showTooltip: {
      name: '[Story]: show tooltip',
      control: { type: 'boolean' },
    },
    breadcrumbs: { table: { disable: true } },
    buttons: { table: { disable: true } },
    anchors: { table: { disable: true } },
    tooltipText: { table: { disable: true } },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
