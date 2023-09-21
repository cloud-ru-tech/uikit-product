import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { StatusTag, StatusTagProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

const meta: Meta = {
  title: 'Components/Status/Status Tag',
  component: StatusTag,
};
export default meta;

const Container = styled.div`
  dispay: flex;
`;

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  background-color: var(${themeVars.sys.neutral.background2Level});
  overflow: auto;
`;

const TableColumn = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;

  background-color: var(${themeVars.sys.neutral.background2Level});

  &:not(:last-child) {
    border-right: 1px solid var(${themeVars.sys.neutral.decorDefault});
  }
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom: 1px solid var(${themeVars.sys.neutral.decorDefault});
  }
`;

const WrapperFContolled = styled.div`
  display: flex;
  padding: 30px;
  column-gap: 30px;
  background-color: var(${themeVars.sys.neutral.background2Level});
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

function Template({ ...args }: StatusTagProps) {
  return (
    <Container>
      <WrapperFContolled>
        <Title>Contolled</Title>
        <StatusTag {...args} />
      </WrapperFContolled>

      <TableWrapper>
        {Object.entries(StatusTag.variants).map(([key, value]) => (
          <TableColumn key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>
              <StatusTag {...args} variant={value} />
            </TableCell>
          </TableColumn>
        ))}
      </TableWrapper>
    </Container>
  );
}

export const statusTag: StoryFn<StatusTagProps> = Template.bind({});

statusTag.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3477%3A46230',
  snackUiLink: 'https://frontend.cp.sbercloud.tech/snack/?path=/story/components-status-status--status',
  extraControlsInclude: ['type', 'variant', 'text'],
});

statusTag.args = getDefaultArgs({
  type: StatusTag.types.Success,
  variant: StatusTag.variants.Transparent,
  text: 'Status',
});

statusTag.argTypes = {
  type: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusTag.types),
  },
  variant: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusTag.variants),
  },
  text: {
    type: 'string',
    control: {
      required: true,
      type: 'text',
    },
  },
};
