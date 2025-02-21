import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionExperts, SectionExpertsProps } from '../src';
import { ExpertDetails } from '../src/components/SectionExperts/types';
import { SECTION_COLORS } from '../src/constants';
import sampleExpertImage from './assets/sample-expert.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Experts',
  component: SectionExperts,
};

export default meta;

type StoryProps = SectionExpertsProps &
  WithLayoutType<{
    expertsAmount: number;
  }>;

const createSampleExpert = (index?: number): ExpertDetails => ({
  image: sampleExpertImage,
  name: `Имя${index ? ` ${index}` : ''}`,
  surname: 'Фамилия',
  jobTitle: 'Должность',
});

const generateExperts = (amount: number): ExpertDetails[] => {
  const experts: ExpertDetails[] = [];

  for (let i = 0; i < amount; i++) {
    experts.push(createSampleExpert(i + 1));
  }

  return experts;
};

const Template: StoryFn<StoryProps> = ({ id, title, expertsAmount, layoutType, backgroundColor }) => {
  const sampleExperts = useMemo(() => generateExperts(expertsAmount), [expertsAmount]);

  return (
    <div className={styles.resizeWrapper}>
      <SectionExperts
        id={id}
        title={title}
        items={sampleExperts}
        layoutType={layoutType}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export const experts: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-experts',
    title: 'Эксперты курса',
    expertsAmount: 9,
    backgroundColor: SECTION_COLORS.NeutralBackground1Level,
    layoutType: 'desktop',
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    expertsAmount: {
      name: '[Story]: Amount of sample experts',
    },
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?m=auto&node-id=7369-475592&t=6PG0wWrr0AIK5xSu-1',
    },
  },
};
