import { Meta, StoryFn } from '@storybook/react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { MobileStepper } from '@sbercloud/uikit-product-mobile-stepper';
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
    showStepper: boolean;
    showPriceSummary: boolean;
    showSideBlock: boolean;
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
  showStepper,
  showPriceSummary,
  showSideBlock,
  ...args
}) => (
  <div className={styles.fullPageHeight}>
    <MobileStepper
      steps={[
        {
          title: '1',
        },
        {
          title: '2',
        },
      ]}
      defaultCurrentStepIndex={0}
    >
      {({
        stepper,
        /* You can also get api of stepper here */
        // goPrev, goNext, isCompleted, currentStepIndex, resetValidation
      }) => (
        <MobilePageForm
          {...args}
          stepper={showStepper ? stepper : undefined}
          subHeader={showSubheader ? args.subHeader : undefined}
          priceSummary={showPriceSummary ? args.priceSummary : undefined}
          sideBlock={showSideBlock ? args.sideBlock : undefined}
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
      )}
    </MobileStepper>
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
    showAdditionalButton: false,
    showButtonTooltip: false,
    showSubheader: true,
    showStepper: true,
    showPriceSummary: true,
    showSideBlock: true,
    subHeader: <Typography.SansBodyM>Subheader</Typography.SansBodyM>,
    priceSummary: {
      total: '5 076 ₽ в месяц',
      content: <div className={styles.sideBlock}>PriceSummary</div>,
    },
    sideBlock: [
      {
        label: 'Документация',
        content: <div className={styles.sideBlock}>Документация</div>,
      },
      {
        label: 'Бюджеты',
        content: <div className={styles.sideBlock}>Бюджеты</div>,
      },
    ],
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
    showStepper: { name: '[Stories]: show stepper' },
    showPriceSummary: { name: '[Stories]: show price summary' },
    showSideBlock: { name: '[Stories]: show sideBlock' },
    subHeader: { table: { disable: true } },

    priceSummary: { table: { disable: true } },
    stepper: { table: { disable: true } },
    sideBlock: { table: { disable: true } },
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
