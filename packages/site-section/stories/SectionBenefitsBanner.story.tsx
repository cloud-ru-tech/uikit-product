import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionBenefitsBanner, SectionBenefitsBannerProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Benefits Banner',
  component: SectionBenefitsBanner,
};
export default meta;

type StoryProps = SectionBenefitsBannerProps;

const SAMPLE_ITEMS: SectionBenefitsBannerProps['items'] = [
  {
    value: '30%',
    description: 'Средняя экономия на<br/>инфраструктуре**',
  },
  {
    value: '56%',
    description: 'Снижение операционных<br/>затрат в облаке за 5 лет***',
  },
  {
    value: '75%',
    description: 'Рост эффективности<br/>IT‑команд***',
  },
];

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={styles.resizeWrapper}>
    <SectionBenefitsBanner {...args} items={SAMPLE_ITEMS} />
  </div>
);

export const benefitsBanner: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Ключевые выгоды',
    titleTag: 'h3',
    backgroundImage: 'https://cdn.cloud.ru/backend/images/about/stat_img.png',
    description:
      '**В облаке в сравнении с локальной инфраструктурой, по данным исследования облачной зрелости российского бизнеса от 2023 года' +
      '<br/>' +
      '***Источник: IDC — исследование использования облака среди крупных предприятий из разных отраслей в течение пяти лет',
    layoutType: LAYOUT_TYPE.Desktop,
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/0oY0swVilRXB9HhJZp5Exo/branch/Lh6nA41D2L7M5P5qrW42Hq/Banners-Lib-2025?node-id=2203-7541',
    },
  },
};
