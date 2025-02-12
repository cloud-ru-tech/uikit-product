import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionLeading, SectionLeadingProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import ai from './assets/ai.webp';
import iaas from './assets/iaas.webp';
import paas from './assets/paas.webp';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Leading',
  component: SectionLeading,
};

export default meta;

type StoryProps = SectionLeadingProps &
  WithLayoutType<{
    expertsAmount: number;
  }>;

const items: SectionLeadingProps['items'] = [
  {
    image: iaas,
    value: '№1',
    label: 'по темпам роста IaaS',
    description: 'iKS-Consulting, 2024',
  },
  {
    image: paas,
    value: '№1',
    label: 'в сегменте PaaS',
    description: 'iKS-Consulting, 2024',
  },
  {
    image: ai,
    value: '№1',
    label: 'на рынке AI',
    description: 'CNews Analytics, 2023',
  },
];

const Template: StoryFn<StoryProps> = ({ title, description, footerDescription, layoutType, backgroundColor }) => (
  <div className={styles.resizeWrapper}>
    <SectionLeading
      title={title}
      description={description}
      items={items}
      footerDescription={footerDescription}
      layoutType={layoutType}
      backgroundColor={backgroundColor}
    />
  </div>
);

export const leading: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Cloud.ru – ведущий провайдер облачных и AI‑технологий',
    description: `Мы создаем персональные решения, оказываем экспертную поддержку и решаем задачи бизнеса любого масштаба: от ритейла и телекома до тяжелой промышленности и банков.`,
    footerDescription:
      '*По объему выручки AI-сервисов за 2022 год (по данным CNews Analytics), PaaS-сервисов за 2023 год (по данным iKS-Consulting), по темпам роста IaaS-сервисов за 2022 год (по данным iKS-Consulting).',
    backgroundColor: SECTION_COLORS.NeutralBackground1Level,
    layoutType: 'desktop',
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?m=auto&node-id=7970-397415',
    },
  },
};
