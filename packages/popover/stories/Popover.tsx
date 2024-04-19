import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { ButtonRound } from '@sbercloud/uikit-product-button';
import { H2_STYLES, H4_SEMIBOLD_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { Divider } from '@snack-uikit/divider';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Popover, PopoverProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Popover',
  component: Popover,
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
  border: 1px solid ${themeVars.sys.neutral.decorDefault};
  border-radius: 16px;
  background-color: ${themeVars.sys.neutral.background2Level};
`;

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

const H4SemiboldStyled = styled.span`
  display: inline-block;
  ${H4_SEMIBOLD_STYLES};

  margin-bottom: 8px;
`;

const Text2Styled = styled.span`
  ${TEXT_2_STYLES};

  color: var(${themeVars.sys.neutral.textSupport});
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 20px;
`;

const PopoverContent = styled.div`
  width: 216px;
`;

type StoryProps = PopoverProps & { uncontrolledBehavior: boolean };

function Template({ uncontrolledBehavior, ...args }: StoryProps) {
  const [isVisible, setIsVisible] = useState(args.visible);

  useEffect(() => {
    setIsVisible(args.visible);
  }, [args.visible]);

  const handleButtonClick = () => setIsVisible(false);

  return (
    <Group>
      <Container>
        <Title>Via controls</Title>
        <Divider />
        <TooltipWrapper>
          <Popover
            {...args}
            visible={uncontrolledBehavior ? undefined : isVisible}
            content={
              <PopoverContent>
                <H4SemiboldStyled>Помощь в работе с облаком</H4SemiboldStyled>

                <Text2Styled>
                  Собрали здесь все самое полезное: быстрый поиск по&nbsp;документации, инструкции, видеоуроки
                  и&nbsp;связь с&nbsp;поддержкой
                </Text2Styled>

                <Footer>
                  <ButtonRound text='Понятно' onClick={handleButtonClick} />
                </Footer>
              </PopoverContent>
            }
          >
            Element
          </Popover>
        </TooltipWrapper>
      </Container>
      <Container>
        <Title>Placements</Title>
        <Divider />
        {Object.values(Popover.placements).map(placement => (
          <Popover content={'content'} placement={placement} key={placement}>
            <div>{placement}</div>
          </Popover>
        ))}
      </Container>
    </Group>
  );
}

export const popover: StoryFn<StoryProps> = Template.bind({});
popover.args = { visible: true, placement: Popover.placements.BottomEnd };
popover.argTypes = {
  uncontrolledBehavior: {
    name: '[Stories] uncontrolledBehavior',
    description: 'Set uncontrolled Behavior',
    control: {
      type: 'boolean',
    },
  },
};
popover.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.BETA],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=55649%3A339069&t=0NOrvNPslhEF66Gj-0',
  },
};
