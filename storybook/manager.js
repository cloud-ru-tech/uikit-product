import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  panelPosition: 'right',
  sidebar: {
    showRoots: true,
  },
  theme: themes.light,
});
