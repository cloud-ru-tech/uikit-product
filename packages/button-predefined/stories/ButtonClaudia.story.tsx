import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonClaudia, ButtonClaudiaProps } from '../src';
import { BUTTON_ARGS, COMMON_ARG_TYPES_CLAUDIA_BUTTON } from './constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Console/Button Predefined/Button Claudia',
  component: ButtonClaudia,
};
export default meta;

type StoryProps = ButtonClaudiaProps & { testMode: boolean };

const Template: StoryFn<StoryProps> = ({ testMode, ...args }) => {
  const [count, setCount] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inc = (e: any) => {
    args.onClick && args.onClick(e);
    setCount(v => v + 1);
  };

  const opacity = testMode ? 1 : 0;

  return (
    <>
      <ControlledWrapper>
        <ButtonClaudia {...args} onClick={inc} />
      </ControlledWrapper>

      <TableWrapper>
        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonClaudia {...BUTTON_ARGS} icon={<PlaceholderSVG />} label={undefined} />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonClaudia {...BUTTON_ARGS} icon={undefined} label='Label Only' />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label + Icon</TableCell>
          <TableCell>
            <ButtonClaudia {...BUTTON_ARGS} icon={<PlaceholderSVG />} label='IconAfter' />
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

export const buttonClaudia: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    disabled: false,
    loading: false,
    icon: undefined,
    type: 'button',
    size: 's',
    fullWidth: false,
    testMode: false,
  },

  argTypes: COMMON_ARG_TYPES_CLAUDIA_BUTTON,

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
