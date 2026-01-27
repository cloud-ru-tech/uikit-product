import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { Layout } from '@cloud-ru/uikit-product-site-layout';
import { APPEARANCE_ERID, EridProps } from '@cloud-ru/uikit-product-site-tag';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BannerPrimary, BannerPrimaryProps } from '../src';
import { Color } from '../src/helperComponents/BannerCommon/constants';
import rectangle from './assets/rectangle.webp';
import square from './assets/square.webp';

const meta: Meta = {
  title: 'Site/Banner/Primary',
  component: BannerPrimary,
};
export default meta;

type StoryProps = BannerPrimaryProps & {
  withTags: boolean;
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

const Template: StoryFn<StoryProps> = ({ withTags, withErid, imgType, ...args }) => {
  const [{ enableSecondButton }, updateArgs] = useArgs();

  useEffect(() => {
    updateArgs({
      buttons: enableSecondButton ? BUTTONS : [BUTTONS[0]],
    });
  }, [args.buttons, enableSecondButton, updateArgs]);

  const imgProps =
    imgType === 'square'
      ? {
          img: args.img ? args.img : square,
          imgType: 'square' as const,
        }
      : {
          img: args.img ? args.img : rectangle,
          imgType: 'rectangle' as const,
        };

  const tags = withTags ? args.tags : undefined;

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
      <BannerPrimary {...args} {...imgProps} tags={tags} {...eridProps} />
    </Layout>
  );
};

export const primary: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'banner-primary',
    'data-test-id': 'banner-primary',
    title: 'Title',
    description: 'description',
    imgType: 'rectangle',
    enableSecondButton: true,
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
    withTags: true,
    expirationDate: 'ДД.ММ.ГГГГ',
    tags: [
      {
        appearance: 'pink',
        text: 'Только для юрлиц',
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
    withTags: {
      name: '[Story]: Enable/Disable tags',
    },
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
