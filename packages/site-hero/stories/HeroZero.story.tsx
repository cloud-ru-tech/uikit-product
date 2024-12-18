import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { Layout } from '@sbercloud/uikit-product-site-layout';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeroZero, HeroZeroProps } from '../src';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Hero/Hero Zero',
  component: HeroZero,
};
export default meta;

type StoryProps = HeroZeroProps & {
  showButtons?: boolean;
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

const buttons: HeroZeroProps['buttons'] = [
  {
    label: 'Sample button',
    appearance: 'primary',
    size: 'l',
    onClick: handleClickStub,
  },
];

const Template: StoryFn<StoryProps> = ({ showButtons, ...args }) => (
  <div className={cn(styles.body, styles.fullPageHeight)}>
    <div className={styles.wrapper}>
      <Layout.SectionWrapper layoutType={args.layoutType} className={styles.customBackground}>
        <HeroZero {...args} breadcrumbs={breadcrumbs} buttons={showButtons ? buttons : undefined} />
      </Layout.SectionWrapper>
    </div>
  </div>
);

export const heroZero: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Title',
    description: 'Description',
    layoutType: LAYOUT_TYPE.Desktop,
    showButtons: true,
    showBottomPadding: true,
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
