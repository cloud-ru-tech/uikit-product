import { Meta, StoryObj } from '@storybook/react';

import { EvolutionSVG, MattermostLogoSVG } from '@cloud-ru/uikit-product-icons';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ErrorPage, ErrorPageProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Error Pages',
  component: ErrorPage,
};
export default meta;

type StoryProps = ErrorPageProps & {
  showSupportCenterButton: boolean;
};

function Template({ showSupportCenterButton, ...args }: StoryProps) {
  const isCustomErrorType = args.errorType === ErrorPage.errorTypes.Custom;
  const isCustomLogoVariant = args.logoVariant === ErrorPage.logoVariants.Custom;

  const errorPageProps = {
    ...(args as ErrorPageProps),
    ...(isCustomErrorType ? { custom: args.custom } : {}),
    ...(isCustomLogoVariant ? { logo: args.logo } : {}),
    onSupportCenterClick: showSupportCenterButton ? args.onSupportCenterClick : undefined,
  } as ErrorPageProps;

  return (
    <div className={styles.wrapper}>
      <ErrorPage {...errorPageProps} />
    </div>
  );
}

export const errorPages: StoryObj<StoryProps> = {
  render: Template,

  args: {
    mainPageUrl: '/',
    errorType: ErrorPage.errorTypes.FrontendError,
    logoVariant: ErrorPage.logoVariants.Cloud,
    logo: (<MattermostLogoSVG />) as unknown as undefined,
    showSupportCenterButton: true,
    custom: {
      title: 'Custom error title',
      text: 'Custom description text',
      statusCode: 422,
      mainButton: {
        label: 'Custom main button',
        icon: <EvolutionSVG />,
        onClick: () => alert('click main button'),
      },
      showMainPageLink: true,
      showBackLink: true,
    } as unknown as undefined,
  },

  argTypes: {
    showSupportCenterButton: {
      name: '[STORIES]: showSupportCenterButton',
      type: 'boolean',
    },
    custom: {
      if: { arg: 'errorType', eq: ErrorPage.errorTypes.Custom },
    },
    logo: {
      if: { arg: 'logoVariant', eq: ErrorPage.logoVariants.Custom },
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
      url: 'https://www.figma.com/file/xutZzH1SnasFgFQD193iTu/%5BLIB%5D-Platform-DS-∙-UX-Patterns?node-id=19012%3A127961',
    },
    badges: [BADGE.BETA],
  },
};
