import { Meta, StoryObj } from '@storybook/react';

import { Link } from '@snack-uikit/link';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CopyLine, CopyLineProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Copy Line/Copy Line',
  component: CopyLine,
};
export default meta;

type StoryProps = CopyLineProps & {
  differentValueToCopy: boolean;
  contentType: 'string' | 'link';
};

const LINK_SIZES = {
  s: 'm',
  xs: 's',
} as const;

function Template({ differentValueToCopy, valueToCopy, contentType, content, size = 's', ...args }: StoryProps) {
  return (
    <div className={styles.wrapper}>
      <CopyLine
        {...args}
        size={size}
        content={
          contentType === 'string' ? (
            content
          ) : (
            <Link
              text={content as string}
              href='#'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              size={LINK_SIZES[size]}
            />
          )
        }
        valueToCopy={differentValueToCopy ? valueToCopy : undefined}
      />
    </div>
  );
}

export const copyLine: StoryObj<StoryProps> = {
  render: Template,

  args: {
    content: 'Content truncate 1 line',
    valueToCopy: 'different value to copy',
    differentValueToCopy: false,
    contentType: 'string',
    copyButtonHideStrategy: 'hover',
  },

  argTypes: {
    content: {
      type: 'string',
    },
    contentType: {
      name: '[STORIES]: demo content type',
      options: ['string', 'link'],
      control: {
        type: 'radio',
      },
    },
    valueToCopy: { table: { disable: true } },
    differentValueToCopy: {
      name: '[STORIES]: different value to copy',
      type: 'boolean',
    },
    size: {
      options: ['xs', 's'],
      defaultValue: 's',
      control: {
        type: 'radio',
      },
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
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=1614%3A89851&mode=design&t=nCXE2W2AqddlTEKF-1',
    },
  },
};
