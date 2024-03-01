import { Meta, StoryFn, StoryObj } from '@storybook/react';

import * as SnackUiIcons from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import classnames from './styles.module.scss';

type StoryProps = {
  size?: number | string;
  applySprite?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Sprite: SnackUiSprite, SpriteSVG: SnackUiSpriteSvg, ...Icons } = SnackUiIcons;

const meta: Meta = {
  title: 'Components/Icons/Interface System',
};
export default meta;

const Template: StoryFn<StoryProps> = ({ size }) => (
  <div className={classnames.wrapper}>
    {Object.keys(Icons).map(name => {
      const Icon = Icons[name];
      return (
        <div key={name} className={classnames.iconCard}>
          <Icon size={size} />
          {name}
        </div>
      );
    })}
  </div>
);

export const interfaceSystem: StoryObj<StoryProps> = Template.bind({});

interfaceSystem.args = {
  size: 24,
};

interfaceSystem.argTypes = {
  size: {
    type: 'number',
  },
};

interfaceSystem.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/1VED778PiyCttjo5uveBUj/branch/iwQwxxJh9XaIDB0xC5uUsE/Product-Icon?type=design&node-id=3%3A102&mode=design&t=qMZT1gr4EMuRsTxi-1',
  },
};
