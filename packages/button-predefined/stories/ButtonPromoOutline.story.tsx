import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonPromoOutline, ButtonPromoOutlineProps } from '../src';
import { BUTTON_ARGS, COMMON_ARG_TYPES } from './constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Site/Button Predefined/Button Promo Outline',
  component: ButtonPromoOutline,
};
export default meta;

type StoryProps = ButtonPromoOutlineProps & { testMode: boolean };
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
        <ButtonPromoOutline {...args} onClick={inc} />
      </ControlledWrapper>

      <TableWrapper>
        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonPromoOutline {...BUTTON_ARGS} appearance='tertiary' icon={<PlaceholderSVG />} label={undefined} />
          </TableCell>
          <TableCell>
            <ButtonPromoOutline {...BUTTON_ARGS} appearance='secondary' icon={<PlaceholderSVG />} label={undefined} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonPromoOutline {...BUTTON_ARGS} appearance='tertiary' icon={undefined} label='Label Only' />
          </TableCell>
          <TableCell>
            <ButtonPromoOutline {...BUTTON_ARGS} appearance='secondary' icon={undefined} label='Label Only' />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label + Icon</TableCell>
          <TableCell>
            <ButtonPromoOutline {...BUTTON_ARGS} appearance='tertiary' icon={<PlaceholderSVG />} label='IconAfter' />
          </TableCell>
          <TableCell>
            <ButtonPromoOutline {...BUTTON_ARGS} appearance='secondary' icon={<PlaceholderSVG />} label='IconAfter' />
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

export const buttonPromoOutline: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    disabled: false,
    loading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'none',
    type: 'button',
    appearance: 'tertiary',
    size: 's',
    fullWidth: false,
    testMode: false,
  },

  argTypes: COMMON_ARG_TYPES,

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3236-37122&t=QSQmRTkPhuqe9cBP-0',
    },
  },
};
