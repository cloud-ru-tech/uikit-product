import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { Layout } from '@sbercloud/uikit-product-site-layout';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BannerSecondary, BannerSecondaryProps } from '../src';
import { EridProps } from '../src/helperComponents';
import { Color } from '../src/helperComponents/BannerCommon/constants';
import { APPEARANCE_ERID } from '../src/helperComponents/Erid/constants';
import rectangle from './assets/rectangle.webp';

const meta: Meta = {
  title: 'Site/Banner/Secondary',
  component: BannerSecondary,
};
export default meta;

type StoryProps = BannerSecondaryProps & {
  withErid: boolean;
  enableSecondButton: boolean;
  eridAppearance: EridProps['appearance'];
  eridTip: string;
};

const BUTTONS = [
  {
    label: 'Label text',
    onClick: () => alert('clicked!'),
  },
  {
    label: 'Label text',
    href: 'https://cloud.ru',
  },
];

const Template: StoryFn<StoryProps> = ({ withErid, ...args }) => {
  const [{ enableSecondButton }, updateArgs] = useArgs();

  useEffect(() => {
    updateArgs({
      buttons: enableSecondButton ? BUTTONS : [BUTTONS[0]],
    });
  }, [args.buttons, enableSecondButton, updateArgs]);

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
      <BannerSecondary {...args} {...eridProps} />
    </Layout>
  );
};

export const secondary: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'banner-primary',
    'data-test-id': 'banner-primary',
    title: 'Title',
    description: 'description',
    enableSecondButton: true,
    img: rectangle,
    buttons: [
      {
        label: 'Label text',
        onClick: () => alert('clicked!'),
      },
      {
        label: 'Label text',
        href: 'https://cloud.ru',
      },
    ],
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
    enableSecondButton: {
      name: '[Story]: Enable/Disable second optional button',
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
