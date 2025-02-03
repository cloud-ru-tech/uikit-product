import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagAudience, TagAudienceProps } from '../src/components';
import { SIZE } from '../src/components/constants';
import { AUDIENCE_TYPE } from '../src/components/TagAudience/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Tag Predefined/Tag Audience',
  component: TagAudience,
};

export default meta;

const Template: StoryFn<TagAudienceProps> = ({ ...args }) => {
  const sizes = Object.values(SIZE);
  const types = Object.values(AUDIENCE_TYPE);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <TagAudience {...args} />
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
                <TagAudience type={type} size={size} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const tagAudience: StoryObj<TagAudienceProps> = {
  render: Template,
  args: {
    type: 'it',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3629-93714&m=dev',
    },
  },
};
