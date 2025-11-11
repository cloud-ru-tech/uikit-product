import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonGigaFunction, ButtonGigaFunctionProps, IconGiga } from '../src';
import { BUTTON_ARGS, COMMON_ARG_TYPES_GIGA_BUTTON } from './constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Console/Claudia/Button Giga/Button Giga Function',
  component: ButtonGigaFunction,
};
export default meta;

type StoryProps = ButtonGigaFunctionProps & { testMode: boolean };

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
        <ButtonGigaFunction {...args} onClick={handleClick} icon={<IconGiga withBranding />} />
      </ControlledWrapper>

      <TableWrapper>
        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonGigaFunction {...BUTTON_ARGS} icon={<IconGiga withBranding />} label={undefined} />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonGigaFunction {...BUTTON_ARGS} icon={undefined} label='Label Only' />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label + Icon After</TableCell>
          <TableCell>
            <ButtonGigaFunction
              {...BUTTON_ARGS}
              icon={<IconGiga withBranding />}
              iconPosition='after'
              label='Icon After'
            />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label + Icon Before</TableCell>
          <TableCell>
            <ButtonGigaFunction
              {...BUTTON_ARGS}
              icon={<IconGiga withBranding />}
              iconPosition='before'
              label='Icon Before'
            />
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

export const buttonGigaFunction: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    disabled: false,
    loading: false,
    icon: undefined,
    type: 'button',
    size: 's',
    fullWidth: false,
    iconPosition: 'before',
    testMode: false,
  },

  argTypes: COMMON_ARG_TYPES_GIGA_BUTTON,

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
