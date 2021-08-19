import { Meta, Story } from '@storybook/react';

import { ButtonTable, ButtonTableManagedLoading, ButtonTableProps } from '../src';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters, onClick } from './helpers';

export default {
  title: 'Components/Button/Button Table',
  component: ButtonTable,
} as Meta;

type StoryProps = ButtonTableProps & {
  getProgressText: string;
};

const Template: Story<StoryProps> = ({ getProgressText, ...args }: StoryProps) => {
  let getProgressTextEvaluated: ButtonTableProps['getProgressText'];

  try {
    getProgressTextEvaluated = eval(getProgressText);
  } catch (e) {
    console.error('getProgressText eval failed', e);
  }

  return (
    <TableWrapper>
      <TableColumn>
        <TableCell></TableCell>
        <TableCell>default</TableCell>
        <TableCell>managed loading</TableCell>
      </TableColumn>

      {Object.entries(ButtonTable.variants).map(([key, value]) => (
        <TableColumn
          key={key}
          data-variant={value === ButtonTable.variants.OnAccent ? TableColumn.variants.accent : undefined}
        >
          <TableCell>{key}</TableCell>

          <TableCell>
            <ButtonTable variant={value} title='Connect' getProgressText={getProgressTextEvaluated} {...args} />
          </TableCell>

          <TableCell>
            <ButtonTableManagedLoading variant={value} title='Connect' onClick={onClick} {...args} />
          </TableCell>
        </TableColumn>
      ))}
    </TableWrapper>
  );
};

export const buttonTable = Template.bind({});

buttonTable.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1100%3A22793',
  extraControlsInclude: ['text', 'loading', 'loadingText', 'progress', 'getProgressText'],
});

buttonTable.args = getDefaultArgs({
  text: 'Подключиться',
  loadingText: 'Выполняется',
  loading: false,
  progress: undefined,
  getProgressText: 'number => `Выполнено ${number}%`',
});

buttonTable.argTypes = {
  progress: {
    control: {
      required: false,
      type: 'number',
      min: 0,
      max: 100,
    },
  },
  text: {
    control: {
      required: true,
      type: 'text',
    },
  },
  loadingText: {
    control: {
      required: false,
      type: 'text',
    },
  },
  getProgressText: {
    control: {
      required: false,
      type: 'text',
    },
  },
};
