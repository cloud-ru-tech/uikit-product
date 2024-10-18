import { styled } from '@linaria/react';
import { Meta, StoryObj } from '@storybook/react';

import { ConfigProvider, useLanguage } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CurrencyFormatter, DateFormatter, NumberFormatter } from '../src';

const meta: Meta = {
  title: 'Not stable/Localization',
  component: ConfigProvider,
};
export default meta;

const Wrapper = styled.div`
  margin: 1rem;
`;

const HooksCodeWrapper = Typography.SansHeadlineM;

type StoryProps = {
  showTime: boolean;
};

function Template({ showTime }: StoryProps) {
  const { languageCode } = useLanguage();
  return (
    <>
      <Wrapper>
        <HooksCodeWrapper>
          <strong>HooksCode:</strong> {languageCode}
        </HooksCodeWrapper>
      </Wrapper>
      <Wrapper>
        <strong>CurrencyFormatter:</strong> <CurrencyFormatter value={1000e10} />
      </Wrapper>

      <Wrapper>
        <strong>NumberFormatter:</strong> <NumberFormatter value={1000e10} />
      </Wrapper>
      <Wrapper>
        <strong>DateFormatter:</strong> <DateFormatter showTime={showTime} value={new Date()} />
      </Wrapper>
    </>
  );
}

export const localization: StoryObj<StoryProps> = {
  render: Template,
  args: {},

  argTypes: {
    showTime: {
      type: 'boolean',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      type: 'figma',
      //TODO
      url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
    },
  },
};
