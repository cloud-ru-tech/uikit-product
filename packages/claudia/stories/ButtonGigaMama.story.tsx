import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonGigaMama, ButtonGigaMamaProps, IconGiga } from '../src';
import { BUTTON_ARGS, COMMON_ARG_TYPES_GIGA_MAMA_BUTTON } from './constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Console/Claudia/Button Giga/Button Giga Mama',
  component: ButtonGigaMama,
};
export default meta;

type StoryProps = ButtonGigaMamaProps & { testMode: boolean };

const Template: StoryFn<StoryProps> = ({ testMode, ...args }) => {
  const [count, setCount] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    args.onClick && args.onClick(event);
    setCount(value => value + 1);
  };

  const opacity = testMode ? 1 : 0;

  return (
    <>
      <ControlledWrapper>
        <ButtonGigaMama {...args} onClick={handleClick} icon={<IconGiga withBranding />} />
      </ControlledWrapper>

      <TableWrapper>
        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonGigaMama {...BUTTON_ARGS} icon={<IconGiga withBranding />} label={undefined} />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonGigaMama {...BUTTON_ARGS} icon={undefined} label='Label Only' />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label + Icon</TableCell>
          <TableCell>
            <ButtonGigaMama {...BUTTON_ARGS} icon={<IconGiga withBranding />} label='Label + Icon' />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Full Width</TableCell>
          <TableCell>
            <ButtonGigaMama {...BUTTON_ARGS} icon={<IconGiga withBranding />} label='Full Width' fullWidth />
          </TableCell>
        </TableColumn>
      </TableWrapper>

      <div style={{ opacity }}>
        <span>Controlled button presses: </span>
        <span data-test-id={'count'}>{count}</span>
      </div>
    </>
  );
};

export const buttonGigaMama: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    disabled: false,
    loading: false,
    icon: undefined,
    type: 'button',
    fullWidth: false,
    testMode: false,
  },

  argTypes: COMMON_ARG_TYPES_GIGA_MAMA_BUTTON,

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Eh52z4T0TC4mSb2jW8vVwW/Product-UI-Kit?node-id=34703-1440&t=tQ2Nu9XkpaSYcUVl-0',
    },
  },
};
