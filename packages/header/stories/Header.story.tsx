import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeaderLayout } from '../src';
import { Breadcrumbs, BreadcrumbsMobile, DATA_TEST_ID, Logo, Menu, ProjectSelect, Toolbar } from './PlugElement';

const meta: Meta = {
  title: 'Console/Header/Header Layout',
};
export default meta;

type StoryProps = {
  isMobile?: boolean;
  showMenu?: boolean;
  showLogo?: boolean;
  showSelect?: boolean;
  showBreadcrumbs?: boolean;
  showToolbar?: boolean;
};

function Template({ isMobile, showBreadcrumbs, showLogo, showMenu, showSelect, showToolbar }: StoryProps) {
  return (
    <div>
      <HeaderLayout
        isMobile={isMobile}
        data-test-id={DATA_TEST_ID.headerLayout}
        menu={showMenu && <Menu />}
        logo={showLogo && <Logo />}
        select={showSelect && <ProjectSelect />}
        breadcrumbs={isMobile ? showBreadcrumbs && <BreadcrumbsMobile /> : showBreadcrumbs && <Breadcrumbs />}
        toolbar={showToolbar && <Toolbar />}
      />
    </div>
  );
}

export const headerLayout: StoryObj<StoryProps> = {
  render: Template,
  args: {
    isMobile: false,
    showMenu: true,
    showLogo: true,
    showSelect: true,
    showBreadcrumbs: true,
    showToolbar: true,
  },
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.BETA],
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit?node-id=629-23012&m=dev',
    },
  },
};
