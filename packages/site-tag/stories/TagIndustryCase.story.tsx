import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { TagPredefined } from '@sbercloud/uikit-product-site-tag';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { INDUSTRY_CASE_TYPE, TagIndustryCaseProps } from '../src/components/TagPredefined/helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Tag Predefined/Industry Case',
  component: TagPredefined,
};

export default meta;

const Template: StoryFn<TagIndustryCaseProps> = ({ ...args }) => {
  const types = Object.values(INDUSTRY_CASE_TYPE);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <TagPredefined {...args} variant='industry' />
      </div>

      <div className={styles.table} style={{ '--columns': 2 }}>
        {types.map(type => (
          <Fragment key={type}>
            <div className={headerCellClassnames}>{type}</div>

            <div key={type} className={styles.cell}>
              <TagPredefined variant='industry' type={type} />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const industryCase: StoryObj<TagIndustryCaseProps> = {
  render: Template,
  args: {
    type: 'secure',
  },
  argTypes: {
    type: {
      options: Object.values(INDUSTRY_CASE_TYPE),
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3229-24925&m=dev',
    },
  },
};
