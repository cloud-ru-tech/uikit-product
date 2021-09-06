import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import copyText from 'copy-to-clipboard';

import { Divider } from '@sbercloud/uikit-react-divider';
import { CopyInterfaceSVG, QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';
import { H2, H4 } from '@sbercloud/uikit-typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tooltip, TooltipProps } from '../src';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  margin: auto;
  box-sizing: border-box;
  padding: 24px;
  width: 400px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 16px;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#333333')};
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

const Template: Story<TooltipProps> = ({ ...args }, { globals: { theme } }) => (
  <Group>
    <Container theme={theme}>
      <H2>Via controls</H2>
      <Divider />
      <TooltipWrapper>
        <Tooltip {...args} iconAction={() => copyText(args.title || 'empty title')}>
          <H4>Element</H4>
        </Tooltip>
      </TooltipWrapper>
    </Container>
    <Container theme={theme}>
      <H2>Placements</H2>
      <Divider />
      {Object.values(Tooltip.placements).map(placement => (
        <Tooltip content={'content'} placement={placement} key={placement}>
          {placement}
        </Tooltip>
      ))}
    </Container>
    <Container theme={theme}>
      <H2>Triggers</H2>
      <Divider />
      {Object.values(Tooltip.triggers).map(trigger => (
        <Tooltip content={'content'} trigger={trigger} key={trigger}>
          {trigger}
        </Tooltip>
      ))}
    </Container>
  </Group>
);

export const tooltip = Template.bind({});
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
  type: Tooltip.types.Main,
};
tooltip.argTypes = {
  icon: {
    options: Object.keys(icons),
    mapping: icons,
    control: { type: 'radio' },
  },
};
tooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5-LIB-Design-System-2.0-Atoms?node-id=3568%3A198995',
  },
  badges: [BADGE.STABLE],
};
