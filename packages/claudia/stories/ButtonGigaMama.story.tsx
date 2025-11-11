import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { S3StorageSVG } from '@sbercloud/uikit-product-icons';
import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonGigaMama, ButtonGigaMamaProps, IconGiga } from '../src';
import { COMMON_ARG_TYPES_GIGA_MAMA_BUTTON } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Claudia/Button Giga/Button Giga Mama',
  component: ButtonGigaMama,
};
export default meta;

type StoryProps = ButtonGigaMamaProps;

const Template: StoryFn<StoryProps> = ({ ...args }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    args.onClick && args.onClick(event);
    alert('onClick');
  };

  return (
    <div className={cn(styles.wrapper, styles.gigaMamaWrapper)}>
      <Typography.SansBodyM>Default</Typography.SansBodyM>
      <ButtonGigaMama {...args} onClick={handleClick} icon={<IconGiga withBranding />} />
      <Typography.SansBodyM>Custom Icon</Typography.SansBodyM>
      <ButtonGigaMama
        {...args}
        onClick={handleClick}
        icon={<S3StorageSVG color={themeVars.sys.primary.accentDefault} size={24} />}
      />
      <Typography.SansBodyM>Full width</Typography.SansBodyM>
      <ButtonGigaMama {...args} onClick={handleClick} icon={<IconGiga withBranding />} fullWidth />
    </div>
  );
};

export const buttonGigaMama: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    disabled: false,
    loading: false,
    icon: undefined,
    type: 'button',
    fullWidth: false,
  },

  argTypes: COMMON_ARG_TYPES_GIGA_MAMA_BUTTON,

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Eh52z4T0TC4mSb2jW8vVwW/Product-UI-Kit?node-id=34703-1440&t=tQ2Nu9XkpaSYcUVl-0',
    },
  },
};
