import { Meta, StoryFn } from '@storybook/react';

import { ButtonIcon, CopyButton, CopyButtonProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

const meta: Meta = {
  title: 'Components/Button/Copy Button',
  component: CopyButton,
};
export default meta;

enum CopyStrategy {
  None = 'None',
  Prevent = 'Prevent',
  ReplaceText = 'ReplaceText',
}

type StoryProps = CopyButtonProps & { copyStrategy?: CopyStrategy; showTooltip?: boolean };

const delayPromise = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const getCopyFlow = (copyStrategy: CopyStrategy): CopyButtonProps['onClickBeforeCopy'] => {
  switch (copyStrategy) {
    case CopyStrategy.Prevent:
      return () => delayPromise(2000).then(() => ({ preventCopy: true }));

    case CopyStrategy.ReplaceText:
      return () => delayPromise(2000).then(() => ({ textToCopy: 'This text has been replaced' }));

    case CopyStrategy.None:
    default:
      return;
  }
};

function Template({ copyStrategy = CopyStrategy.None, showTooltip, ...args }: StoryProps) {
  return (
    <TableWrapper>
      <TableColumn>
        <TableCell>Button Icon Transparent / Default</TableCell>
        <TableCell>
          <CopyButton
            {...args}
            tooltip={{ show: showTooltip, ...args.tooltip }}
            onClickBeforeCopy={getCopyFlow(copyStrategy)}
          />
        </TableCell>
      </TableColumn>

      <TableColumn>
        <TableCell>Button Icon / Color</TableCell>
        <TableCell>
          <CopyButton
            as={ButtonIcon}
            variant={ButtonIcon.variants.Color}
            {...args}
            tooltip={{ show: showTooltip, ...args.tooltip }}
            onClickBeforeCopy={getCopyFlow(copyStrategy)}
          />
        </TableCell>
      </TableColumn>
    </TableWrapper>
  );
}

export const copyButton: StoryFn<StoryProps> = Template.bind({});

copyButton.parameters = getDefaultParameters({
  extraControlsInclude: ['[Stories]: Show tooltip', 'text', 'tooltip', 'copyStrategy'],
});

copyButton.args = {
  ...getDefaultArgs({
    text: 'Text for copy',
    tooltip: {
      content: 'Копировать',
    },
  }),
  copyStrategy: CopyStrategy.None,
  showTooltip: true,
};

copyButton.argTypes = {
  showTooltip: {
    name: '[Stories]: Show tooltip',
    control: {
      type: 'boolean',
    },
  },
  copyStrategy: {
    options: Object.values(CopyStrategy),
    control: {
      type: 'radio',
    },
  },
  text: {
    control: {
      required: true,
      type: 'text',
    },
  },
  'data-test-id': {
    control: {
      required: false,
      type: 'text',
    },
  },
};
