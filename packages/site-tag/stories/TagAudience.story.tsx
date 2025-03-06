import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagPredefined } from '../src/components';
import { AUDIENCE_TYPE, TagAudienceProps } from '../src/components/TagPredefined/helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Tag Predefined/Audience',
  component: TagPredefined,
};

export default meta;

const Template: StoryFn<TagAudienceProps> = ({ ...args }) => {
  const types = Object.values(AUDIENCE_TYPE);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <TagPredefined {...args} variant='audience' />
      </div>

      <div className={styles.table} style={{ '--columns': 2 }}>
        {types.map(type => (
          <Fragment key={type}>
            <div className={headerCellClassnames}>{type}</div>
            <div key={type} className={styles.cell}>
              <TagPredefined variant='audience' type={type} />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const audience: StoryObj<TagAudienceProps> = {
  render: Template,
  args: {
    type: 'it',
  },
  argTypes: {
    type: {
      options: Object.values(AUDIENCE_TYPE),
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3629-93714&m=dev',
    },
  },
};
