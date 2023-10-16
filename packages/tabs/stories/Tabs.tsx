import { styled } from '@linaria/react';
import { useArgs } from '@storybook/client-api';
import { Meta, StoryFn } from '@storybook/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { Divider } from '@sbercloud/uikit-product-divider';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tabs } from '../src';

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs.Container,
};
export default meta;

const Container = styled.div`
  margin-top: 16px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 8px;
  background-color: var(${themeVars.sys.neutral.background2Level});
  padding: 12px;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

type StoryProps = Tabs.ContainerProps & { 'data-test-id'?: string; className?: string };

function Template({ ...args }: StoryProps) {
  const [{ value }, updateArgs] = useArgs();
  const handleClick = (tab: string) => updateArgs({ value: tab });

  return (
    <Tabs.Container {...args} value={args.value || 'id2'} onChange={handleClick}>
      <Tabs.Navigation data-test-id={args['data-test-id']} className={args.className}>
        <Tabs.NavigationItem value={'id1'} label={'First'} />
        <Tabs.NavigationItem value={'id2'} label={'Second'} counter={1} />
        <Tabs.NavigationItem value={'id3'} label={'Third'} disabled />
        <Tabs.NavigationItem value={'id4'} label={'Fourth'} counter={123} />
        <Tabs.NavigationItem value={'id5'} label={'Fifth'} disabled={value !== 'id4'} />
        <Tabs.NavigationItem value={'id6'} label={'Six'} />
        <Tabs.NavigationItem value={'id7'} label={'Seven'} counter={1} />
        <Tabs.NavigationItem value={'id8'} label={'Eight'} />
        <Tabs.NavigationItem value={'id9'} label={'Nine'} counter={123} />
        <Tabs.NavigationItem value={'id10'} label={'Ten'} />
        <Tabs.NavigationItem value={'id11'} label={'Eleven'} />
        <Tabs.NavigationItem value={'id12'} label={'Twelve'} counter={1} />
        <Tabs.NavigationItem value={'id13'} label={'Thirteen'} />
        <Tabs.NavigationItem value={'id14'} label={'Fourteen'} counter={123} />
        <Tabs.NavigationItem value={'id15'} label={'Fifteen'} />
        <Tabs.NavigationItem value={'id16'} label={'Sixteen'} />
        <Tabs.NavigationItem value={'id17'} label={'Seventeen'} counter={1} />
        <Tabs.NavigationItem value={'id18'} label={'Eighteen'} />
        <Tabs.NavigationItem value={'id19'} label={'Nineteen'} counter={123} />
        <Tabs.NavigationItem value={'id20'} label={'Twenty'} />
      </Tabs.Navigation>
      <Divider />
      <Container>
        <Tabs.Content value={'id1'}>FIRST</Tabs.Content>
        <Tabs.Content value={'id2'}>SECOND</Tabs.Content>
        <Tabs.Content value={'id3'}>THIRD</Tabs.Content>
        <Tabs.Content value={'id4'}>FOURTH</Tabs.Content>
        <Tabs.Content value={'id5'}>FIFTH</Tabs.Content>
        <Tabs.Content value={'id6'}>SIX</Tabs.Content>
        <Tabs.Content value={'id7'}>SEVEN</Tabs.Content>
        <Tabs.Content value={'id8'}>EIGHT</Tabs.Content>
        <Tabs.Content value={'id9'}>NINE</Tabs.Content>
        <Tabs.Content value={'id10'}>TEN</Tabs.Content>
        <Tabs.Content value={'id11'}>ELEVEN</Tabs.Content>
        <Tabs.Content value={'id12'}>TWELVE</Tabs.Content>
        <Tabs.Content value={'id13'}>THIRTEEN</Tabs.Content>
        <Tabs.Content value={'id14'}>FOURTEEN</Tabs.Content>
        <Tabs.Content value={'id15'}>FIFTEEN</Tabs.Content>
        <Tabs.Content value={'id16'}>SIXTEEN</Tabs.Content>
        <Tabs.Content value={'id17'}>SEVENTEEN</Tabs.Content>
        <Tabs.Content value={'id18'}>EIGHTEEN</Tabs.Content>
        <Tabs.Content value={'id19'}>NINETEEN</Tabs.Content>
        <Tabs.Content value={'id20'}>TWENTY</Tabs.Content>
      </Container>
    </Tabs.Container>
  );
}

export const tabs: StoryFn<StoryProps> = Template.bind({});
tabs.args = {
  className: 'controlled-classname',
  'data-test-id': 'tabs__navigation-container',
};
tabs.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=4824%3A65492',
  },
  badges: [BADGE.STABLE],
};
tabs.argTypes = {
  value: {
    options: [
      'id1',
      'id2',
      'id3',
      'id4',
      'id5',
      'id6',
      'id7',
      'id8',
      'id9',
      'id10',
      'id11',
      'id12',
      'id13',
      'id14',
      'id15',
      'id16',
      'id17',
      'id18',
      'id19',
      'id20',
    ],
    control: { type: 'select' },
  },
  className: {
    control: { type: 'text' },
  },
  'data-test-id': {
    control: { type: 'text' },
  },
};
