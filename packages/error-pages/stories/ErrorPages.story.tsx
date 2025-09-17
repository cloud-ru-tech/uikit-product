import { Meta, StoryObj } from '@storybook/react';

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

type StoryProps = ErrorPageProps & { showSupportCenterButton: boolean };

function Template({ showSupportCenterButton, ...args }: StoryProps) {
  return (
    <div className={styles.wrapper}>
      <ErrorPage {...args} onSupportCenterClick={showSupportCenterButton ? args.onSupportCenterClick : undefined} />
    </div>
  );
}

export const errorPages: StoryObj<StoryProps> = {
  render: Template,

  args: {
    mainPageUrl: '/',
    errorType: ErrorPage.errorTypes.FrontendError,
    logoVariant: ErrorPage.logoVariants.Cloud,
    showSupportCenterButton: true,
  },

  argTypes: {
    showSupportCenterButton: {
      name: '[STORIES]: showSupportCenterButton',
      type: 'boolean',
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
