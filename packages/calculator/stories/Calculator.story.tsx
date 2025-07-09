import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Calculator, CALCULATOR_TYPE, CalculatorProps, CATALOG_CONFIG } from '../src';
import { getFetcherFn, getOnDownloadFileClick, getOnShareClick } from '../src/services';
import src from './bg.webp';

const DEFAULT_BACKEND_HOST = 'https://api.dev.site.sbercloud.dev';

const meta: Meta = {
  title: 'Console/Calculator',
  component: Calculator,
};
export default meta;

const onShareClick = getOnShareClick();
const onDownloadFileClick = getOnDownloadFileClick();

const Template: StoryFn<CalculatorProps & { backendHost: string }> = ({ ...args }) => {
  const fetcherFn = getFetcherFn(args.backendHost);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 0',
      }}
    >
      <div
        style={{
          padding: '8px 0',
          maxWidth: '1248px',
          width: '100%',
        }}
      >
        <Calculator
          {...args}
          config={CATALOG_CONFIG}
          fetcherFn={fetcherFn}
          actions={{
            onDownloadFileClick,
            onShareClick,
          }}
        />
      </div>
    </div>
  );
};

export const calculator: StoryObj<CalculatorProps & { backendHost: string }> = {
  render: Template,
  args: {
    calculatorType: CALCULATOR_TYPE.Main,
    layoutType: LAYOUT_TYPE.Desktop,
    bgImage: src,
    backendHost: DEFAULT_BACKEND_HOST,
  },
  argTypes: {
    backendHost: {
      description: 'URL используемый для запросов на цены в калькуляторе',
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
      //TODO: update to the correct one
      url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
    },
  },
};
