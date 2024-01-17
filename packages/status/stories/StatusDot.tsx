import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { StatusDot, StatusDotProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

const meta: Meta = {
  title: 'Components/Status/Status Dot',
  component: StatusDot,
};
export default meta;

const Container = styled.div`
  width: 400px;
  height: 400px;
  display: grid;
  align-items: flex-start;
  column-gap: 24px;
  padding: 48px;
  border: 1px solid ${themeVars.sys.neutral.decorDefault};
  border-radius: 10%;
  background-color: ${themeVars.sys.neutral.background2Level};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
`;

const Column = styled.div`
  display: grid;
  row-gap: 16px;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StatusDotWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const Name = styled.span`
  font-size: 14px;
`;

function Template({ ...args }: StatusDotProps) {
  return (
    <Container>
      <Column>
        <Title>Controlled</Title>
        <Row>
          <StatusDot {...args} />
        </Row>
      </Column>
      <ColumnWrapper>
        <Column>
          <Title>Sizes</Title>
          {Object.entries(StatusDot.sizes).map(([name, size]) => (
            <Row key={name}>
              <Name>{name}</Name>
              <StatusDotWrapper>
                <StatusDot type={StatusDot.types.Neutral} size={size} />
              </StatusDotWrapper>
            </Row>
          ))}
        </Column>

        <Column>
          <Title>Types</Title>
          {Object.entries(StatusDot.types).map(([name, type]) => (
            <Row key={name}>
              <Name>{name}</Name>
              <StatusDotWrapper>
                <StatusDot size={StatusDot.sizes.Small} type={type} />
              </StatusDotWrapper>
            </Row>
          ))}
        </Column>
      </ColumnWrapper>
    </Container>
  );
}

export const statusDot: StoryFn<StatusDotProps> = Template.bind({});

statusDot.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3477%3A46230',
  snackUiLink:
    'https://frontend.cp.sbercloud.tech/snack/?path=/story/components-status-status-indicator--status-indicator',
  extraControlsInclude: ['type', 'variant', 'size'],
});

statusDot.args = getDefaultArgs({
  size: StatusDot.sizes.Small,
  type: StatusDot.types.Success,
});

statusDot.argTypes = {
  type: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusDot.types),
  },
  size: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusDot.sizes),
  },
};
