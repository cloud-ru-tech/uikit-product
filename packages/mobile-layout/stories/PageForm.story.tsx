import { Meta, StoryFn } from '@storybook/react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  BUTTON_PRIMARY_VARIANT,
  BUTTON_SECONDARY_VARIANT,
  ButtonPrimaryVariant,
  ButtonSecondaryVariant,
  MobilePageForm,
  MobilePageFormProps,
} from '../src/components';
import styles from './styles.module.scss';

export default {
  title: 'Mobile/Layout/Page Form',
  component: MobilePageForm,
} as Meta;

const Template: StoryFn<
  MobilePageFormProps & {
    showPrefix: boolean;
    showFooter: boolean;
    showSubheader: boolean;
    showSecondaryButton: boolean;
    showAdditionalButton: boolean;
    buttonPrimaryVariant: ButtonPrimaryVariant;
    buttonSecondaryVariant: ButtonSecondaryVariant;
    showButtonTooltip: boolean;
  }
> = ({
  showFooter,
  footer,
  showAdditionalButton,
  showSecondaryButton,
  buttonPrimaryVariant,
  buttonSecondaryVariant,
  showButtonTooltip,
  showSubheader,
  ...args
}) => (
  <div className={styles.fullPageHeight}>
    <MobilePageForm
      {...args}
      subHeader={showSubheader ? args.subHeader : undefined}
      footer={
        showFooter
          ? {
              ...footer,
              buttonPrimary: {
                ...footer?.buttonPrimary,
                variant: buttonPrimaryVariant,
                tooltip: showButtonTooltip ? footer?.buttonPrimary.tooltip : undefined,
              },
              buttonSecondary: showSecondaryButton
                ? {
                    ...footer?.buttonSecondary,
                    variant: buttonSecondaryVariant,
                    tooltip: showButtonTooltip ? footer?.buttonSecondary?.tooltip : undefined,
                  }
                : undefined,
              buttonAdditional: showAdditionalButton
                ? {
                    ...footer?.buttonAdditional,
                    tooltip: showButtonTooltip ? footer?.buttonAdditional?.tooltip : undefined,
                  }
                : undefined,
            }
          : undefined
      }
    />
  </div>
);

export const pageForm = {
  render: Template,

  args: {
    title: 'Lorem ipsum dolor',
    footer: {
      buttonPrimary: {
        variant: 'create',
        tooltip: { tip: 'Primary Example tip' },
      },
      buttonSecondary: {
        variant: 'cancel',
        tooltip: { tip: 'Secondary Example tip' },
      },
      buttonAdditional: {
        label: 'Label text',
        icon: <PlaceholderSVG />,
        tooltip: { tip: 'Additional Example tip' },
      },
    },
    children:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci aliquid amet atque, consectetur deleniti dolorem dolorum ducimus eaque esse et fugiat hic illum inventore ipsum iure laudantium mollitia nemo perspiciatis quasi quos reiciendis ullam, veniam voluptates voluptatibus? Ad, laborum?',
    showPrefix: true,
    showFooter: true,
    buttonPrimaryVariant: 'create',
    buttonSecondaryVariant: 'cancel',
    showSecondaryButton: true,
    showAdditionalButton: true,
    showButtonTooltip: false,
    showSubheader: true,
    subHeader: <Typography.SansBodyM>Subheader</Typography.SansBodyM>,
  },

  argTypes: {
    showPrefix: { name: '[Stories]: show prefix' },
    showFooter: { name: '[Stories]: show footer' },
    buttonPrimaryVariant: {
      name: '[Stories]: show footer -> button primary variant',
      if: { arg: 'showFooter', eq: true },
      control: 'radio',
      options: Object.values(BUTTON_PRIMARY_VARIANT),
    },
    buttonSecondaryVariant: {
      name: '[Stories]: show footer -> button secondary variant',
      if: { arg: 'showFooter', eq: true },
      control: 'radio',
      options: Object.values(BUTTON_SECONDARY_VARIANT),
    },
    showSecondaryButton: { name: '[Stories]: show footer -> button secondary', if: { arg: 'showFooter', eq: true } },
    showAdditionalButton: { name: '[Stories]: show footer -> button additional', if: { arg: 'showFooter', eq: true } },
    showButtonTooltip: { name: '[Stories]: show button tooltips', if: { arg: 'showFooter', eq: true } },
    showSubheader: { name: '[Stories]: show subheader' },
    subHeader: { table: { disable: true } },

    footer: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?node-id=2%3A17574&mode=dev',
    },
    layout: 'fullscreen',
  },
};
