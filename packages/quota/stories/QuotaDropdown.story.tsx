import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { QuotaCard, QuotaDropdown, QuotaDropdownProps } from '../src';
import { QUOTA_CARD_DEFAULT_PROPS } from './contants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Quota/Quota Dropdown',
  component: QuotaDropdown,
};
export default meta;

type StoryProps = QuotaDropdownProps & {
  cardsCounter: number;
};

function onRetry() {
  toaster.userAction.neutral({ label: 'onRetry', 'data-test-id': 'onRetry' });
}

function Template({ cardsCounter, ...args }: StoryProps) {
  const [count, setCount] = useState<number>(cardsCounter);

  useEffect(() => {
    setCount(cardsCounter);
  }, [cardsCounter]);

  return (
    <div className={styles.wrapper}>
      <QuotaDropdown {...args} onRetry={onRetry}>
        {Array.from({ length: count })
          .fill('')
          .map((_, idx) => (
            <QuotaCard
              {...QUOTA_CARD_DEFAULT_PROPS}
              key={idx}
              loading={idx % 3 === 0}
              limit={idx % 3 === 2 ? 0 : QUOTA_CARD_DEFAULT_PROPS.limit}
              increaseLink={{
                href: '#',
              }}
            />
          ))}
      </QuotaDropdown>
    </div>
  );
}

export const quotaDropdown: StoryObj<StoryProps> = {
  render: Template,

  args: {
    title: 'Title quota',
    tip: 'tip',
    description: 'current-project-name',
    dataError: false,
    placement: 'bottom-end',
    cardsCounter: 15,
  },

  argTypes: {
    cardsCounter: {
      name: '[Stories]: demo quota cards count',
    },
    tip: {
      type: 'string',
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/2vraLX7XLBHYmqjAuHKEP6/Product-components?node-id=5551-53305&m=dev',
    },
  },
};
