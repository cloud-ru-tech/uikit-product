import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagMedia, TagMediaProps } from '../src/components';
import { SIZE } from '../src/components/constants';
import { MEDIA_TYPE } from '../src/components/TagMedia/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Tag Predefined/Tag Media',
  component: TagMedia,
};

export default meta;

const Template: StoryFn<TagMediaProps> = ({ ...args }) => {
  const sizes = Object.values(SIZE);
  const types = Object.values(MEDIA_TYPE);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <TagMedia {...args} />
      </div>

      <div className={styles.table} style={{ '--columns': 3 }}>
        <div className={headerCellClassnames} />
        {sizes.map(size => (
          <div key={size} className={headerCellClassnames}>
            {size}
          </div>
        ))}
        {types.map(type => (
          <Fragment key={type}>
            <div className={headerCellClassnames}>{type}</div>
            {sizes.map(size => (
              <div key={size} className={styles.cell}>
                <TagMedia type={type} size={size} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const tagMedia: StoryObj<TagMediaProps> = {
  render: Template,
  args: {
    type: 'news',
    size: 'xs',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3229-24912&m=dev',
    },
  },
};
