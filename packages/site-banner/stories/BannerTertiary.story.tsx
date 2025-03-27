import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Layout } from '@sbercloud/uikit-product-site-layout';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BannerTertiary, BannerTertiaryProps } from '../src';
import { EridProps } from '../src/helperComponents';
import { Color } from '../src/helperComponents/BannerCommon/constants';
import { APPEARANCE_ERID } from '../src/helperComponents/Erid/constants';
import rectangle from './assets/rectangle.webp';

const meta: Meta = {
  title: 'Site/Banner/Tertiary',
  component: BannerTertiary,
};
export default meta;

type StoryProps = BannerTertiaryProps & {
  withErid: boolean;
  eridAppearance: EridProps['appearance'];
  eridTip: string;
};

const Template: StoryFn<StoryProps> = ({ withErid, ...args }) => {
  const eridProps =
    withErid && args.eridTip
      ? {
          erid: {
            tip: args.eridTip,
            appearance: args.eridAppearance,
          },
        }
      : {};

  return (
    <Layout>
      <BannerTertiary {...args} {...eridProps} />
    </Layout>
  );
};

export const tertiary: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'banner-tertiary',
    'data-test-id': 'banner-primary',
    title: 'Title',
    description: 'description',
    img: rectangle,
    // imgType: 'rectangle',
    button: {
      label: 'Label text',
      onClick: () => alert('clicked!'),
    },
    withErid: true,
    eridTip: 'Реклама от Cloud.ru. erid: 1234567890',
    eridAppearance: APPEARANCE_ERID.Neutral,
    appearance: 'decor',
    color: 'blue',
    layoutType: 'desktop',
  },
  argTypes: {
    withErid: {
      name: '[Story]: Enable/Disable erid',
    },
    color: {
      options: Object.values(Color),
      control: { type: 'select' },
      if: { arg: 'appearance', eq: 'decor' },
    },
    erid: {
      table: {
        disable: true,
      },
    },
    eridAppearance: {
      name: '[Story]: Внешний вид erid',
      if: { arg: 'withErid', eq: true },
      options: [APPEARANCE_ERID.Neutral, APPEARANCE_ERID.InvertNeutral],
      control: { type: 'select' },
    },
    eridTip: {
      name: '[Story]: Текст внутри тултипа erid',
      if: { arg: 'withErid', eq: true },
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=9462-226253&t=M9LpCpb3wjdVZvGD-4',
    },
  },
};
