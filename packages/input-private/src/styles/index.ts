import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

export const themes = [PURPLE_THEME, PURPLE_DARK_THEME, GREEN_THEME, GREEN_DARK_THEME];

export const DEFAULT_TEXT_STYLES = `
  color: var(${COLORS.text.default});
`;

export const DISABLED_TEXT_STYLES = `
  color: var(${COLORS.text.disabled});
`;

export const DEFAULT_PLACEHOLDER_STYLES = `
  color: var(${COLORS.placeholder.default});
`;

export const DISABLED_PLACEHOLDER_STYLES = `
  color: var(${COLORS.placeholder.disabled});
`;
