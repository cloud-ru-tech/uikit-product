import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagIndustryCase, TagIndustryCaseProps } from '../src/components';
import { SIZE } from '../src/components/constants';
import { INDUSTRY_CASES_TYPE } from '../src/components/TagIndustryCase/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Tag Predefined/Tag Industry Case',
  component: TagIndustryCase,
};

export default meta;

const Template: StoryFn<TagIndustryCaseProps> = ({ ...args }) => {
  const sizes = Object.values(SIZE);
  const types = Object.values(INDUSTRY_CASES_TYPE);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <TagIndustryCase {...args} />
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
                <TagIndustryCase type={type} size={size} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const tagIndustryCase: StoryObj<TagIndustryCaseProps> = {
  render: Template,
  args: {
    type: 'secure',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3229-24925&m=dev',
    },
  },
};
