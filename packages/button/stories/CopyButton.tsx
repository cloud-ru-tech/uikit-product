import { Meta, StoryFn } from '@storybook/react';

import { ButtonIcon, CopyButton, CopyButtonProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Copy Button',
  component: CopyButton,
} as Meta;

enum CopyStrategy {
  None = 'None',
  Prevent = 'Prevent',
  ReplaceText = 'ReplaceText',
}

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

const Template: StoryFn<CopyButtonProps & { copyStrategy?: CopyStrategy }> = ({
  copyStrategy = CopyStrategy.None,
  ...args
}) => (
  <TableWrapper>
    <TableColumn>
      <TableCell>Button Icon Transparent / Default</TableCell>
      <TableCell>
        <CopyButton {...args} onClickBeforeCopy={getCopyFlow(copyStrategy)} />
      </TableCell>
    </TableColumn>

    <TableColumn>
      <TableCell>Button Icon / Color</TableCell>
      <TableCell>
        <CopyButton
          as={ButtonIcon}
          variant={ButtonIcon.variants.Color}
          {...args}
          onClickBeforeCopy={getCopyFlow(copyStrategy)}
        />
      </TableCell>
    </TableColumn>
  </TableWrapper>
);

export const copyButton = Template.bind({});

copyButton.parameters = getDefaultParameters({
  extraControlsInclude: ['text', 'tooltip', 'copyStrategy'],
});

copyButton.args = {
  ...getDefaultArgs({
    text: 'Text for copy',
    tooltip: {
      content: 'Копировать',
    },
  }),
  copyStrategy: CopyStrategy.None,
};

copyButton.argTypes = {
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
