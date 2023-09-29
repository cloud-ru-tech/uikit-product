import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { WHITE_ALFA, BLACK_ALFA, GREY, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  COLOR_DEFAULT: '--color-markdown-editor__color-default',
  BACKGROUND_DEFAULT: '--color-markdown-editor__background-default',
  CODE: {
    BACKGROUND_COLOR: `--color-markdown-editor__code-background`,
  },
  TABLE: {
    HEADER_BACKGROUND: '--color-markdown-editor__table-header-background',
    BORDER_COLOR: '--color-markdown-editor__table-border-color',
  },
  BLOCKQUOTE: {
    BORDER_COLOR: '--color-markdown-editor__blockquote-border-color',
  },
  CONTAINER_BORDER: '--color-markdown-editor__container-border',
  TEXTAREA_BORDER_DEFAULT: '--color-markdown-editor__textarea-border-default',
  TEXTAREA_BORDER_HOVERED: '--color-markdown-editor__textarea-border-hovered',
  TEXTAREA_BORDER_FOCUSED: '--color-markdown-editor__textarea-border-focused',
  TEXTAREA_TEXT: '--color-markdown-editor__textarea-text',
  TEXTAREA_BG: '--color-markdown-editor__textarea-bg',
  TEXTAREA_PLACEHOLDER_TEXT: '--color-markdown-editor__textarea-placeholder-text',
  HELP_ICON: '--color-markdown-editor__help-icon',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      color-scheme: light;
      ${COLORS.COLOR_DEFAULT}: var(${GREY[800]});
      ${COLORS.BACKGROUND_DEFAULT}: var(${GREY[0]});
      ${COLORS.CODE.BACKGROUND_COLOR}: var(${BLACK_ALFA[4]});
      ${COLORS.TABLE.HEADER_BACKGROUND}: var(${BLACK_ALFA[4]});
      ${COLORS.TABLE.BORDER_COLOR}: var(${BLACK_ALFA[16]});
      ${COLORS.BLOCKQUOTE.BORDER_COLOR}: var(${BLACK_ALFA[16]});
      ${COLORS.CONTAINER_BORDER}: var(${BLACK_ALFA[16]});
      ${COLORS.TEXTAREA_BORDER_DEFAULT}: var(${BLACK_ALFA[16]});
      ${COLORS.TEXTAREA_BORDER_HOVERED}: var(${PURPLE[50]});
      ${COLORS.TEXTAREA_BORDER_FOCUSED}: var(${PURPLE[100]});
      ${COLORS.TEXTAREA_TEXT}: var(${GREY[800]});
      ${COLORS.TEXTAREA_BG}: var(${GREY[0]});
      ${COLORS.TEXTAREA_PLACEHOLDER_TEXT}: var(${BLACK_ALFA[48]});
      ${COLORS.HELP_ICON}: var(${GREY[200]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      color-scheme: light;
      ${COLORS.COLOR_DEFAULT}: var(${GREY[800]});
      ${COLORS.BACKGROUND_DEFAULT}: var(${GREY[0]});
      ${COLORS.CODE.BACKGROUND_COLOR}: var(${BLACK_ALFA[4]});
      ${COLORS.TABLE.HEADER_BACKGROUND}: var(${BLACK_ALFA[4]});
      ${COLORS.TABLE.BORDER_COLOR}: var(${BLACK_ALFA[16]});
      ${COLORS.BLOCKQUOTE.BORDER_COLOR}: var(${BLACK_ALFA[16]});
      ${COLORS.CONTAINER_BORDER}: var(${BLACK_ALFA[16]});
      ${COLORS.TEXTAREA_BORDER_DEFAULT}: var(${BLACK_ALFA[16]});
      ${COLORS.TEXTAREA_BORDER_HOVERED}: var(${GREEN[50]});
      ${COLORS.TEXTAREA_BORDER_FOCUSED}: var(${GREEN[100]});
      ${COLORS.TEXTAREA_TEXT}: var(${GREY[800]});
      ${COLORS.TEXTAREA_BG}: var(${GREY[0]});
      ${COLORS.TEXTAREA_PLACEHOLDER_TEXT}: var(${BLACK_ALFA[48]});
      ${COLORS.HELP_ICON}: var(${GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      color-scheme: dark;
      ${COLORS.COLOR_DEFAULT}: var(${GREY[100]});
      ${COLORS.BACKGROUND_DEFAULT}: var(${GREY[850]});
      ${COLORS.CODE.BACKGROUND_COLOR}: var(${WHITE_ALFA[8]});
      ${COLORS.TABLE.HEADER_BACKGROUND}: var(${WHITE_ALFA[8]});
      ${COLORS.TABLE.BORDER_COLOR}: var(${WHITE_ALFA[16]});
      ${COLORS.BLOCKQUOTE.BORDER_COLOR}: var(${WHITE_ALFA[16]});
      ${COLORS.CONTAINER_BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.TEXTAREA_BORDER_DEFAULT}: var(${WHITE_ALFA[24]});
      ${COLORS.TEXTAREA_BORDER_HOVERED}: var(${PURPLE[25]});
      ${COLORS.TEXTAREA_BORDER_FOCUSED}: var(${PURPLE[50]});
      ${COLORS.TEXTAREA_TEXT}: var(${GREY[100]});
      ${COLORS.TEXTAREA_BG}: var(${GREY[800]});
      ${COLORS.TEXTAREA_PLACEHOLDER_TEXT}: var(${WHITE_ALFA[48]});
      ${COLORS.HELP_ICON}: var(${GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      color-scheme: dark;
      ${COLORS.COLOR_DEFAULT}: var(${GREY[100]});
      ${COLORS.BACKGROUND_DEFAULT}: var(${GREY[850]});
      ${COLORS.CODE.BACKGROUND_COLOR}: var(${WHITE_ALFA[8]});
      ${COLORS.TABLE.HEADER_BACKGROUND}: var(${WHITE_ALFA[8]});
      ${COLORS.TABLE.BORDER_COLOR}: var(${WHITE_ALFA[16]});
      ${COLORS.BLOCKQUOTE.BORDER_COLOR}: var(${WHITE_ALFA[16]});
      ${COLORS.CONTAINER_BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.TEXTAREA_BORDER_DEFAULT}: var(${WHITE_ALFA[24]});
      ${COLORS.TEXTAREA_BORDER_HOVERED}: var(${GREEN[25]});
      ${COLORS.TEXTAREA_BORDER_FOCUSED}: var(${GREEN[50]});
      ${COLORS.TEXTAREA_TEXT}: var(${GREY[100]});
      ${COLORS.TEXTAREA_BG}: var(${GREY[800]});
      ${COLORS.TEXTAREA_PLACEHOLDER_TEXT}: var(${WHITE_ALFA[48]});
      ${COLORS.HELP_ICON}: var(${GREY[200]});
    }
  }
`;
