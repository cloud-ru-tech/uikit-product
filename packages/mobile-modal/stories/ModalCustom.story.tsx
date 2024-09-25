import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileModalCustom, MobileModalCustomProps } from '../src';
import { MODE, SIZE } from '../src/constants';

const meta: Meta = {
  title: 'Mobile/Modal/Modal Custom',
  component: MobileModalCustom,
};
export default meta;

function Template({ open: openProp, ...args }: MobileModalCustomProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonFilled label={'Open modal'} onClick={() => setOpen(!open)} />
      <MobileModalCustom {...args} open={openProp ?? open} onClose={handleClose} />
    </div>
  );
}

export const modalCustom: StoryObj<MobileModalCustomProps> = {
  render: Template,

  args: {
    size: SIZE.Auto,
    mode: MODE.Regular,
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=12599-164564&m=auto',
    },
  },
};
