import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { copyToClipboard } from '@sbercloud/ft-copy-to-clipboard';
import { Divider } from '@sbercloud/uikit-product-divider';
import { CopyInterfaceSVG, QuestionInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { H2_STYLES, H4_STYLES } from '@sbercloud/uikit-product-typography';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tooltip, TooltipProps } from '../src';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
};
export default meta;

const Container = styled.div`
  margin: auto;
  box-sizing: border-box;
  padding: 24px;
  width: 400px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 16px;
  background-color: var(${themeVars.sys.neutral.background2Level});
`;

const icons = {
  none: undefined,
  CopyInterfaceSVG: <CopyInterfaceSVG />,
  QuestionInterfaceSVG: <QuestionInterfaceSVG />,
};

const TooltipWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Title = styled.h2`
  ${H2_STYLES};
`;

const Target = styled.h4`
  ${H4_STYLES};
`;

function Template({ ...args }: TooltipProps) {
  return (
    <Group>
      <Container>
        <Title>Via controls</Title>
        <Divider />
        <TooltipWrapper>
          <Tooltip {...args} iconAction={() => copyToClipboard(args.title || 'empty title')}>
            <Target>Element</Target>
          </Tooltip>
        </TooltipWrapper>
      </Container>
      <Container>
        <Title>Placements</Title>
        <Divider />
        {Object.values(Tooltip.placements).map(placement => (
          <Tooltip content={'content'} placement={placement} key={placement} type={Tooltip.types.Instant}>
            {placement}
          </Tooltip>
        ))}
      </Container>
      <Container>
        <Title>Triggers</Title>
        <Divider />
        {Object.values(Tooltip.triggers).map(trigger => (
          <Tooltip content={'content'} trigger={trigger} key={trigger} type={Tooltip.types.Instant}>
            {trigger}
          </Tooltip>
        ))}
      </Container>
    </Group>
  );
}

export const tooltip: StoryFn<TooltipProps> = Template.bind({});
tooltip.args = {
  title: 'Регион размещения',
  content:
    'Окружение будет развёрнуто на узлах суперкомпьютера Кристофари. При обучении на 1-8 GPU действует тариф ai-standart, при обучении на 9+ GPU действует тариф ai-pro. Подробные условия тарификации описаны в Документации.',
  link: {
    text: 'Подробнее о тарифах',
    onClick: e => {
      e.preventDefault();
    },
  },
  type: Tooltip.types.Instant,
};
tooltip.argTypes = {
  icon: {
    options: Object.keys(icons),
    mapping: icons,
    control: { type: 'radio' },
  },
  disableMaxWidth: {
    control: { type: 'boolean' },
  },
};
tooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=993%3A15815',
  },
  badges: [BADGE.STABLE],
};
