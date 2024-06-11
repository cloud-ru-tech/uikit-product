import { Meta, StoryFn } from '@storybook/react';

import { Link } from '@snack-uikit/link';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CopyLine, CopyLineProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack UIkit/Copy Line/Copy Line',
  component: CopyLine,
};
export default meta;

type StoryProps = CopyLineProps & {
  differentValueToCopy: boolean;
  contentType: 'string' | 'link';
};

function Template({ differentValueToCopy, valueToCopy, contentType, content, ...args }: StoryProps) {
  return (
    <div className={styles.wrapper}>
      <CopyLine
        {...args}
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
              size='m'
            />
          )
        }
        valueToCopy={differentValueToCopy ? valueToCopy : undefined}
      />
    </div>
  );
}

export const copyLine: StoryFn<StoryProps> = Template.bind({});

copyLine.args = {
  content: 'Content truncate 1 line',
  valueToCopy: 'different value to copy',
  differentValueToCopy: false,
  contentType: 'string',
};

copyLine.argTypes = {
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
};

copyLine.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=1614%3A89851&mode=design&t=nCXE2W2AqddlTEKF-1',
  },
};
