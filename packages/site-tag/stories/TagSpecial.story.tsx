import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagSpecial, TagSpecialProps } from '../src';
import { Appearance } from '../src/types';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Tag/Tag Special',
  component: TagSpecial,
};

export default meta;

const APPEARANCE: Appearance[] = ['neutral', 'blue', 'green', 'orange', 'violet', 'pink', 'red'];

const Template: StoryFn<TagSpecialProps> = ({ ...args }) => {
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <TagSpecial {...args} />
      </div>

      <div className={styles.table} style={{ '--columns': 2 }}>
        {APPEARANCE.map(appearance => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>
            <div className={styles.cell}>
              <TagSpecial appearance={appearance} text={appearance} />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const tagSpecial: StoryObj<TagSpecialProps> = {
  render: Template,
  args: {
    text: 'Free',
    appearance: 'blue',
    tip: 'tooltip text',
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3221-25743&m=dev',
    },
  },
};
