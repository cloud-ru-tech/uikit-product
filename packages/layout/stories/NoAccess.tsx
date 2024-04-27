import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NoAccess, NoAccessProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack Uikit/Layout/NoAccess',
  component: NoAccess,
};
export default meta;

function Template({ ...args }: NoAccessProps) {
  return (
    <div className={styles.wrapper}>
      <NoAccess {...args} />
    </div>
  );
}

export const noAccess: StoryFn<NoAccessProps> = Template.bind({});

noAccess.args = {
  serviceName: 'service name',
};

noAccess.argTypes = {};

noAccess.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/0Jmkqmz1o5Q0LbElCBG207/Role-Model?type=design&node-id=7-107653&t=yj4NVnVT79pMtjxP-0',
  },
};
