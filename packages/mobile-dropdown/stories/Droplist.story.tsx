import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileDroplist, MobileDroplistProps } from '../src';

const meta: Meta = {
  title: 'Mobile/Droplist',
  component: MobileDroplist,
};
export default meta;

function Template({ open: openProp, ...args }: MobileDroplistProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>();

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div>
      <MobileDroplist
        {...args}
        open={openProp ?? open}
        onOpenChange={setOpen}
        selection={{ mode: 'single', value: selected, onChange: handleSelect }}
      >
        <ButtonFilled label={'Open dropdown'} />
      </MobileDroplist>
    </div>
  );
}

export const droplist: StoryObj<MobileDroplistProps> = {
  render: Template,

  args: {
    items: [
      { id: '1', content: { option: 'Option' } },
      { id: '2', content: { option: 'Option' } },
      { id: '3', content: { option: 'Option' } },
      { id: '4', content: { option: 'Option' } },
      { id: '1', content: { option: 'Option' } },
      { id: '2', content: { option: 'Option' } },
      { id: '3', content: { option: 'Option' } },
      { id: '4', content: { option: 'Option' } },
      { id: '1', content: { option: 'Option' } },
      { id: '2', content: { option: 'Option' } },
      { id: '3', content: { option: 'Option' } },
      { id: '4', content: { option: 'Option' } },
      { id: '1', content: { option: 'Option' } },
      { id: '2', content: { option: 'Option' } },
      { id: '3', content: { option: 'Option' } },
      { id: '4', content: { option: 'Option' } },
      { id: '1', content: { option: 'Option' } },
      { id: '2', content: { option: 'Option' } },
      { id: '3', content: { option: 'Option' } },
      { id: '4', content: { option: 'Option' } },
    ],
    pinBottom: [
      { id: '1', content: { option: 'Option' } },
      { id: '2', content: { option: 'Option' } },
      { id: '3', content: { option: 'Option' } },
      { id: '4', content: { option: 'Option' } },
      { id: '1', content: { option: 'Option' } },
      { id: '2', content: { option: 'Option' } },
      { id: '3', content: { option: 'Option' } },
      { id: '4', content: { option: 'Option' } },
    ],
    footer: <ButtonFilled fullWidth />,
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=12608-168865&m=auto',
    },
  },
};
