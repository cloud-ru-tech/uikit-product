import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { TagPredefined } from '@sbercloud/uikit-product-site-tag';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SIZE } from '../src/components/constants';
import { PROMO_TYPE, TagPromoProps } from '../src/components/TagPredefined/helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Tag Predefined/Promo',
  component: TagPredefined,
};

export default meta;

const Template: StoryFn<TagPromoProps> = ({ ...args }) => {
  const sizes = Object.values(SIZE);
  const types = Object.values(PROMO_TYPE);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <TagPredefined {...args} variant='promo' />
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
                <TagPredefined variant='promo' type={type} size={size} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const promo: StoryObj<TagPromoProps> = {
  render: Template,
  args: {
    type: 'free-configuration',
    size: 's',
  },
  argTypes: {
    type: {
      options: Object.values(PROMO_TYPE),
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3221-25743&m=dev',
    },
  },
};
