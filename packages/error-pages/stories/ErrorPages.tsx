import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ErrorPage, ErrorPageProps } from '../src';

export default {
  title: 'Not stable/Error Pages',
  component: ErrorPage,
} as Meta;

const Wrapper = styled.div`
  height: 1000px;
`;

const Template: Story<ErrorPageProps & { showSupportCenterButton: boolean }> = ({
  showSupportCenterButton,
  ...args
}) => (
  <Wrapper>
    <ErrorPage {...args} onSupportCenterClick={showSupportCenterButton ? args.onSupportCenterClick : undefined} />
  </Wrapper>
);

export const errorPages = Template.bind({});
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
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/xutZzH1SnasFgFQD193iTu/%5BLIB%5D-Platform-DS-∙-UX-Patterns?node-id=19012%3A127961',
  },
  badges: [BADGE.BETA],
};
