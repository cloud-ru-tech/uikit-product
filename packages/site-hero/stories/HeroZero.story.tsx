import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useMemo } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeroZero, HeroZeroProps } from '../src';
import { HERO_COLORS } from '../src/constants';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Hero/Hero Zero',
  component: HeroZero,
};
export default meta;

type StoryProps = HeroZeroProps & {
  showButtons?: boolean;
  showSecondaryButton?: boolean;
};

const handleClickStub = () => window.alert('Clicked!');

const breadcrumbs: HeroZeroProps['breadcrumbs'] = [
  {
    id: 'main',
    label: 'Main',
    onClick: handleClickStub,
  },
  {
    id: 'title',
    label: 'Title',
    onClick: handleClickStub,
  },
  {
    id: 'Subtitle',
    label: 'Title',
    onClick: handleClickStub,
  },
];

const Template: StoryFn<StoryProps> = ({ showButtons, showSecondaryButton, ...args }) => {
  const buttons = useMemo(() => {
    const sampleButtons: HeroZeroProps['buttons'] = [
      {
        label: 'Action button',
        appearance: 'primary',
        size: 'l',
        onClick: handleClickStub,
      },
    ];

    if (showSecondaryButton) {
      sampleButtons.push({
        label: 'Secondary button',
        appearance: 'neutral',
        size: 'l',
        onClick: handleClickStub,
      });
    }

    return sampleButtons;
  }, [showSecondaryButton]);

  return (
    <div className={cn(styles.body, styles.fullPageHeight)}>
      <div className={styles.wrapper}>
        <HeroZero {...args} breadcrumbs={breadcrumbs} buttons={showButtons ? buttons : undefined} />
      </div>
    </div>
  );
};

export const heroZero: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Мероприятия Cloud.ru',
    description:
      'Календарь наших событий: вебинары, конференции, хакатоны, лекции. Выбирайте интересную тему и регистрируйтесь на мероприятие или смотрите запись, когда вам будет удобно.',
    backgroundColor: HERO_COLORS.NeutralBackground,
    layoutType: LAYOUT_TYPE.Desktop,
    showButtons: true,
    showSecondaryButton: true,
    showBottomPadding: true,
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
    showButtons: {
      name: '[Story]: show buttons',
      control: { type: 'boolean' },
    },
    showSecondaryButton: {
      name: '[Story]: show secondary button',
      control: { type: 'boolean' },
      if: { arg: 'showButtons', eq: true },
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/Website-components?node-id=4257-90510&node-type=frame&t=NbkGtrV7KA8pL1rT-0',
    },
  },
};
