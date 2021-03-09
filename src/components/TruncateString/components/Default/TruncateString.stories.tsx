import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { styled } from '@linaria/react';

import { Slider } from 'components/Slider';

import { TruncateString, ITruncateStringProps } from './TruncateString';

export default {
  title: 'Components/TruncateString/Default',
  component: TruncateString,
  decorators: [withDesign],
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

export const Template: Story<ITruncateStringProps> = () => {
  const [width, setWidth] = useState<number>(200);

  return (
    <Column width={width}>
      <TruncateString text={`${exampleText} ${exampleText}`} />
      <Row>
        <TruncateString text={exampleText} />
        <TruncateString text={exampleText} />
        <TruncateString text={exampleText} />
      </Row>
      <Slider value={width} min={100} max={500} onChange={setWidth} />
    </Column>
  );
};

Template.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
};
