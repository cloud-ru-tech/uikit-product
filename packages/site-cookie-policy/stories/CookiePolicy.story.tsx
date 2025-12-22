import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useReducer } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CookiePolicy, CookiePolicyProps } from '../src/components';
import { COOKIE_POLICY_STORAGE_KEY } from '../src/constants';

const meta: Meta = {
  title: 'Site/CookiePolicy',
  component: CookiePolicy,
};
export default meta;

const Template: StoryFn<CookiePolicyProps> = ({ ...args }) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleReset = () => {
    localStorage.removeItem(COOKIE_POLICY_STORAGE_KEY);
    forceUpdate();
  };

  return (
    <div>
      <button style={{ marginBottom: 16 }} onClick={handleReset}>
        Сбросить cookie-policy
      </button>
      <CookiePolicy {...args} />
    </div>
  );
};

export const cookiePolicy: StoryObj<CookiePolicyProps> = {
  render: Template,
  parameters: {
    args: {
      layoutType: 'desktop',
    },
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/branch/RIgEnSrZot9Ed3b6OGz8Wp/-LIB--SITE--Product-UI-Kit?node-id=27556-80293&m=dev',
    },
    docs: {
      description: {
        story: 'После нажатия на кнопку баннер прячется. Чтобы повторно показать, нажмите "Сбросить cookie-policy".',
      },
    },
  },
};
