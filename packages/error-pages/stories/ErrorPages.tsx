import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ErrorPage, ErrorPageProps } from '../src';

const meta: Meta = {
  title: 'Snack Uikit/Error Pages',
  component: ErrorPage,
};
export default meta;

const Wrapper = styled.div`
  height: calc(100vh - 40px);
`;

type StoryProps = ErrorPageProps & { showSupportCenterButton: boolean };

function Template({ showSupportCenterButton, ...args }: StoryProps) {
  return (
    <Wrapper>
      <ErrorPage {...args} onSupportCenterClick={showSupportCenterButton ? args.onSupportCenterClick : undefined} />
    </Wrapper>
  );
}

export const errorPages: StoryFn<StoryProps> = Template.bind({});
errorPages.args = {
  mainPageUrl: '/',
  errorType: ErrorPage.errorTypes.FrontendError,
  logoVariant: ErrorPage.logoVariants.Cloud,
  showSupportCenterButton: true,
};
errorPages.argTypes = {
  showSupportCenterButton: {
    name: '[STORIES]: showSupportCenterButton',
    type: 'boolean',
  },
};
errorPages.parameters = {
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
};
