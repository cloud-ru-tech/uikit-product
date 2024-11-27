import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NoAccess, NoAccessProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Layout/NoAccess',
  component: NoAccess,
};
export default meta;

function Template({ ...args }: NoAccessProps) {
  return (
    <div className={styles.noAccessWrapper}>
      <NoAccess {...args} />
    </div>
  );
}

export const noAccess: StoryObj<NoAccessProps> = {
  render: Template,

  args: {
    serviceName: 'service name',
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
      url: 'https://www.figma.com/file/0Jmkqmz1o5Q0LbElCBG207/Role-Model?type=design&node-id=7-107653&t=yj4NVnVT79pMtjxP-0',
    },
  },
};
