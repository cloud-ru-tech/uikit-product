import { useState } from 'react';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Slider } from 'components/Slider';

import { TruncateString, ITruncateStringProps } from './TruncateString';

export default {
  title: 'Components/Truncate String',
  component: TruncateString,
} as Meta;

const Column = styled.div<{ width: number }>`
  display: flex;
  width: ${({ width }) => width}px;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const exampleText =
  'bucket-user-19ea8cbb-43e1-4d31-b76f-b2a5e5a9c058-id-qgoiku6b';

const Template: Story<ITruncateStringProps> = ({ ...args }) => {
  const [width, setWidth] = useState<number>(200);

  return (
    <>
      <Column width={width}>
        <TruncateString text={`${exampleText}_${exampleText}`} {...args} />
        <Row>
          <TruncateString text={exampleText} {...args} />
          <TruncateString text={exampleText} {...args} />
        </Row>
      </Column>
      <Slider value={width} min={100} max={1100} onChange={setWidth} />
    </>
  );
};

export const truncateString = Template.bind({});
truncateString.args = {};
truncateString.parameters = {};
