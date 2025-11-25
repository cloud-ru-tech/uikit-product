import { Meta, StoryObj } from '@storybook/react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CurrencyFormatter, DateFormatter, NumberFormatter } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Localization',
  component: undefined,
};
export default meta;

type StoryProps = {
  showTime: boolean;
};

function Template({ showTime }: StoryProps) {
  const { lang } = useLocale();

  return (
    <>
      <div className={styles.wrapper}>
        <Typography.SansHeadlineM>
          <strong>HooksCode:</strong> {lang}
        </Typography.SansHeadlineM>
      </div>
      <div className={styles.wrapper}>
        <strong>CurrencyFormatter:</strong> <CurrencyFormatter value={1000e10} />
      </div>

      <div className={styles.wrapper}>
        <strong>NumberFormatter:</strong> <NumberFormatter value={1000e10} />
      </div>
      <div className={styles.wrapper}>
        <strong>DateFormatter:</strong> <DateFormatter showTime={showTime} value={new Date()} />
      </div>
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
