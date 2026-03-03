import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PlaceholderSVG } from '@cloud-ru/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipAnimated, ChipAnimatedProps } from '../src';
import { VARIANT } from '../src/components/ChipAnimated/constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Console/Claudia/Chip Animated',
  component: ChipAnimated,
};
export default meta;

type StoryProps = Omit<ChipAnimatedProps, 'icon' | 'tooltip' | 'onClick'> & {
  showIcon?: boolean;
  showClickCounter?: boolean;
  tooltipPosition?: 'top' | 'bottom';
  tooltipText?: string;
};

const noop = () => {};

const Template: StoryFn<StoryProps> = ({
  showClickCounter,
  showIcon,
  tooltipPosition,
  tooltipText,
  ...args
}: StoryProps) => {
  const [clickCounter, setClickCounter] = useState(0);
  const increaseCounter = () => setClickCounter(prev => prev + 1);

  const iconElement = showIcon ? <PlaceholderSVG size={24} /> : undefined;
  const tooltipProps = {
    position: (tooltipPosition || 'top') as 'top' | 'bottom',
    label: tooltipText || 'Tooltip text',
  };

  return (
    <>
      <ControlledWrapper>
        <ChipAnimated {...args} icon={iconElement} tooltip={tooltipProps} onClick={increaseCounter} />
      </ControlledWrapper>

      {showClickCounter && (
        <div>
          click count:
          <span data-test-id='click__counter'>{clickCounter}</span>
        </div>
      )}

      <TableWrapper>
        <TableColumn>
          <TableCell>Label + Icon</TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              icon={<PlaceholderSVG size={24} />}
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Default}
            />
          </TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              icon={<PlaceholderSVG size={24} />}
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Accent}
            />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label + Tooltip</TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Default}
            />
          </TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Accent}
            />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Label + Icon + Tooltip</TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              icon={<PlaceholderSVG size={24} />}
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Default}
            />
          </TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              icon={<PlaceholderSVG size={24} />}
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Accent}
            />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Loading</TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Default}
              loading
            />
          </TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Accent}
              loading
            />
          </TableCell>
        </TableColumn>
        <TableColumn>
          <TableCell>Disabled</TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Default}
              disabled
            />
          </TableCell>
          <TableCell>
            <ChipAnimated
              label='Label text'
              tooltip={{ position: 'top', label: 'Tooltip text' }}
              onClick={noop}
              variant={VARIANT.Accent}
              disabled
            />
          </TableCell>
        </TableColumn>
      </TableWrapper>
    </>
  );
};

export const chipAnimated: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    variant: VARIANT.Default,
    disabled: false,
    loading: false,
    showIcon: false,
    isTouchDevice: false,
    tooltipPosition: 'top',
    tooltipText: 'Tooltip text',
    'data-test-id': 'chip-animated',
    tabIndex: undefined,
    className: undefined,
    showClickCounter: false,
  },

  argTypes: {
    variant: {
      options: Object.values(VARIANT),
      control: {
        type: 'radio',
      },
    },
    showIcon: {
      name: '[Stories]: Show icon',
      control: {
        type: 'boolean',
      },
    },
    isTouchDevice: {
      control: {
        type: 'boolean',
      },
    },
    tooltipPosition: {
      name: '[Stories]: Tooltip position',
      options: ['top', 'bottom'],
      control: {
        type: 'radio',
      },
    },
    tooltipText: {
      name: '[Stories]: Tooltip text',
      control: {
        type: 'text',
      },
    },
    showClickCounter: {
      name: '[Stories]: Show click counter',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
