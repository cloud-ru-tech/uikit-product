import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SHADOW } from '../src';
import styles from './shadow-styles.module.scss';

const meta: Meta = {
  title: 'Utils/Shadow',
};
export default meta;

function Template() {
  return (
    <div className={styles.themeWrapper}>
      {Object.keys(SHADOW).map(shadowKey => (
        <div className={styles.shadowItem} key={shadowKey}>
          <div className={styles.shadowPreview} style={{ '--shadow': SHADOW[shadowKey] }}>
            {shadowKey}

            <div className={styles.text}>{SHADOW[shadowKey]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const shadow: StoryObj = {
  render: Template,
  args: {},
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1015%3A1',
    },
  },
};
