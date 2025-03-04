import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { TagPredefined } from '@sbercloud/uikit-product-site-tag';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SIZE } from '../src/components/constants';
import { PLATFORM_TYPE, TagPlatformProps } from '../src/components/TagPredefined/helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Tag Predefined/Platform',
  component: TagPredefined,
};

export default meta;

const Template: StoryFn<TagPlatformProps> = ({ ...args }) => {
  const sizes = Object.values(SIZE);
  const types = Object.values(PLATFORM_TYPE);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <TagPredefined {...args} variant='platform' />
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
                <TagPredefined variant='platform' type={type} size={size} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const platform: StoryObj<TagPlatformProps> = {
  render: Template,
  args: {
    type: 'evolution',
    size: 'xs',
  },
  argTypes: {
    type: {
      options: Object.values(PLATFORM_TYPE),
    },
    variant: {
      table: {
        disable: true,
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3228-49083&m=dev',
    },
  },
};
