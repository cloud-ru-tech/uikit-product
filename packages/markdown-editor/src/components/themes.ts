import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { WHITE_ALFA, BLACK_ALFA, GREY, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  SYNTAX_COMMENT: '--color-markdown-editor__syntax-comment',
  SYNTAX_CONSTANT: '--color-markdown-editor__syntax-constant',
  SYNTAX_ENTITY: '--color-markdown-editor__syntax-entity',
  SYNTAX_STORAGE_MODIFIER_IMPORT: '--color-markdown-editor__syntax-storage-modifier-import',
  SYNTAX_ENTITY_TAG: '--color-markdown-editor__syntax-entity-tag',
  SYNTAX_KEYWORD: '--color-markdown-editor__syntax-keyword',
  SYNTAX_STRING: '--color-markdown-editor__syntax-string',
  SYNTAX_VARIABLE: '--color-markdown-editor__syntax-variable',
  SYNTAX_BRACKETHIGHLIGHTER_UNNMATCHED: '--color-markdown-editor__syntax-brackethighlighter-unmatched',
  SYNTAX_INVALID_ILLEGAL_TEXT: '--color-markdown-editor__syntax-invalid-illegal-text',
  SYNTAX_INVALID_ILLEGAL_BG: '--color-markdown-editor__syntax-illegal-bg',
  SYNTAX_CARRIAGE_RETURN_TEXT: '--color-markdown-editor__syntax-return-text',
  SYNTAX_CARRIAGE_RETURN_BG: '--color-markdown-editor__syntax-return-bg',
  SYNTAX_STRING_REGEXP: '--color-markdown-editor__syntax-regexp',
  SYNTAX_NARKUP_LIST: '--color-markdown-editor__syntax-list',
  SYNTAX_MARKUP_HEADING: '--color-markdown-editor__syntax-heading',
  SYNTAX_MARKUP_ITALIC: '--color-markdown-editor__syntax-italic',
  SYNTAX_MARKUP_BOLD: '--color-markdown-editor__syntax-bold',
  SYNTAX_MARKUP_DELETED_TEXT: '--color-markdown-editor__syntax-deleted-text',
  SYNTAX_MARKUP_DELETED_BG: '--color-markdown-editor__syntax-deleted-bg',
  SYNTAX_MARKUP_INSERTED_TEXT: '--color-markdown-editor__syntax-inserted-text',
  SYNTAX_MARKUP_INSERTED_BG: '--color-markdown-editor__syntax-inserted-bg',
  SYNTAX_MARKUP_CHANGED_TEXT: '--color-markdown-editor__syntax-changed-text',
  SYNTAX_MARKUP_CHANGED_BG: '--color-markdown-editor__syntax-changed-bg',
  SYNTAX_MARKUP_IGNORED_TEXT: '--color-markdown-editor__syntax-ignored-text',
  SYNTAX_MARKUP_IGNORED_BG: '--color-markdown-editor__syntax-ignored-bg',
  SYNTAX_META_DIFF_RANGE: '--color-markdown-editor__syntax-meta-diff-range',
  SYNTAX_BRACKETHIGHLIGHTER_ANGLE: '--color-markdown-editor__syntax-brackethighlighter-angle',
  SYNTAX_SUBLIMELINTER_GUTTER_MARK: '--color-markdown-editor__syntax-sublimelinter-gutter-mark',
  SYNTAX_CONSTANT_OTHER_REFERENCE_LINK: '--color-markdown-editor__syntax-constant-other-reference-link',
  FG_DEFAULT: '--color-markdown-editor__fg-default',
  FG_MUTED: '--color-markdown-editor__fg-muted',
  FG_SUBTLE: '--color-markdown-editor__fg-subtle',
  CANVAS_DEFAULT: '--color-markdown-editor__canvas-default',
  CANVAS_SUBTLE: '--color-markdown-editor__canvas-subtle',
  BORDER_DEFAULT: '--color-markdown-editor__border-default',
  BORDER_MUTED: '--color-markdown-editor__border-muted',
  NEUTRAL_MUTED: '--color-markdown-editor__neutral-muted',
  ACCENT_FG: '--color-markdown-editor__accent-fg',
  ACCENT_EMPHASIS: '--color-markdown-editor__accent-emphasis',
  ATTENTION_SUBTLE: '--color-markdown-editor__attention-subtle',
  DANGER_FG: '--color-markdown-editor__danger-fg',
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
      ${COLORS.SYNTAX_COMMENT}: #6e7781;
      ${COLORS.SYNTAX_CONSTANT}: #0550ae;
      ${COLORS.SYNTAX_ENTITY}: #8250df;
      ${COLORS.SYNTAX_STORAGE_MODIFIER_IMPORT}: #24292f;
      ${COLORS.SYNTAX_ENTITY_TAG}: #116329;
      ${COLORS.SYNTAX_KEYWORD}: #cf222e;
      ${COLORS.SYNTAX_STRING}: #0a3069;
      ${COLORS.SYNTAX_VARIABLE}: #953800;
      ${COLORS.SYNTAX_BRACKETHIGHLIGHTER_UNNMATCHED}: #82071e;
      ${COLORS.SYNTAX_INVALID_ILLEGAL_TEXT}: #f6f8fa;
      ${COLORS.SYNTAX_INVALID_ILLEGAL_BG}: #82071e;
      ${COLORS.SYNTAX_CARRIAGE_RETURN_TEXT}: #f6f8fa;
      ${COLORS.SYNTAX_CARRIAGE_RETURN_BG}: #cf222e;
      ${COLORS.SYNTAX_STRING_REGEXP}: #116329;
      ${COLORS.SYNTAX_NARKUP_LIST}: #3b2300;
      ${COLORS.SYNTAX_MARKUP_HEADING}: #0550ae;
      ${COLORS.SYNTAX_MARKUP_ITALIC}: #24292f;
      ${COLORS.SYNTAX_MARKUP_BOLD}: #24292f;
      ${COLORS.SYNTAX_MARKUP_DELETED_TEXT}: #82071e;
      ${COLORS.SYNTAX_MARKUP_DELETED_BG}: #FFEBE9;
      ${COLORS.SYNTAX_MARKUP_INSERTED_TEXT}: #116329;
      ${COLORS.SYNTAX_MARKUP_INSERTED_BG}: #dafbe1;
      ${COLORS.SYNTAX_MARKUP_CHANGED_TEXT}: #953800;
      ${COLORS.SYNTAX_MARKUP_CHANGED_BG}: #ffd8b5;
      ${COLORS.SYNTAX_MARKUP_IGNORED_TEXT}: #eaeef2;
      ${COLORS.SYNTAX_MARKUP_IGNORED_BG}: #0550ae;
      ${COLORS.SYNTAX_META_DIFF_RANGE}: #8250df;
      ${COLORS.SYNTAX_BRACKETHIGHLIGHTER_ANGLE}: #57606a;
      ${COLORS.SYNTAX_SUBLIMELINTER_GUTTER_MARK}: #8c959f;
      ${COLORS.SYNTAX_CONSTANT_OTHER_REFERENCE_LINK}: #0a3069;
      ${COLORS.FG_DEFAULT}: #24292f;
      ${COLORS.FG_MUTED}: #57606a;
      ${COLORS.FG_SUBTLE}: #6e7781;
      ${COLORS.CANVAS_DEFAULT}: #ffffff;
      ${COLORS.CANVAS_SUBTLE}: #f6f8fa;
      ${COLORS.BORDER_DEFAULT}: #d0d7de;
      ${COLORS.BORDER_MUTED}: hsla(210,18%,87%,1);
      ${COLORS.NEUTRAL_MUTED}: rgba(175,184,193,0.2);
      ${COLORS.ACCENT_FG}: #0969da;
      ${COLORS.ACCENT_EMPHASIS}: #0969da;
      ${COLORS.ATTENTION_SUBTLE}: #fff8c5;
      ${COLORS.DANGER_FG}: #cf222e;

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
      ${COLORS.SYNTAX_COMMENT}: #6e7781;
      ${COLORS.SYNTAX_CONSTANT}: #0550ae;
      ${COLORS.SYNTAX_ENTITY}: #8250df;
      ${COLORS.SYNTAX_STORAGE_MODIFIER_IMPORT}: #24292f;
      ${COLORS.SYNTAX_ENTITY_TAG}: #116329;
      ${COLORS.SYNTAX_KEYWORD}: #cf222e;
      ${COLORS.SYNTAX_STRING}: #0a3069;
      ${COLORS.SYNTAX_VARIABLE}: #953800;
      ${COLORS.SYNTAX_BRACKETHIGHLIGHTER_UNNMATCHED}: #82071e;
      ${COLORS.SYNTAX_INVALID_ILLEGAL_TEXT}: #f6f8fa;
      ${COLORS.SYNTAX_INVALID_ILLEGAL_BG}: #82071e;
      ${COLORS.SYNTAX_CARRIAGE_RETURN_TEXT}: #f6f8fa;
      ${COLORS.SYNTAX_CARRIAGE_RETURN_BG}: #cf222e;
      ${COLORS.SYNTAX_STRING_REGEXP}: #116329;
      ${COLORS.SYNTAX_NARKUP_LIST}: #3b2300;
      ${COLORS.SYNTAX_MARKUP_HEADING}: #0550ae;
      ${COLORS.SYNTAX_MARKUP_ITALIC}: #24292f;
      ${COLORS.SYNTAX_MARKUP_BOLD}: #24292f;
      ${COLORS.SYNTAX_MARKUP_DELETED_TEXT}: #82071e;
      ${COLORS.SYNTAX_MARKUP_DELETED_BG}: #FFEBE9;
      ${COLORS.SYNTAX_MARKUP_INSERTED_TEXT}: #116329;
      ${COLORS.SYNTAX_MARKUP_INSERTED_BG}: #dafbe1;
      ${COLORS.SYNTAX_MARKUP_CHANGED_TEXT}: #953800;
      ${COLORS.SYNTAX_MARKUP_CHANGED_BG}: #ffd8b5;
      ${COLORS.SYNTAX_MARKUP_IGNORED_TEXT}: #eaeef2;
      ${COLORS.SYNTAX_MARKUP_IGNORED_BG}: #0550ae;
      ${COLORS.SYNTAX_META_DIFF_RANGE}: #8250df;
      ${COLORS.SYNTAX_BRACKETHIGHLIGHTER_ANGLE}: #57606a;
      ${COLORS.SYNTAX_SUBLIMELINTER_GUTTER_MARK}: #8c959f;
      ${COLORS.SYNTAX_CONSTANT_OTHER_REFERENCE_LINK}: #0a3069;
      ${COLORS.FG_DEFAULT}: #24292f;
      ${COLORS.FG_MUTED}: #57606a;
      ${COLORS.FG_SUBTLE}: #6e7781;
      ${COLORS.CANVAS_DEFAULT}: #ffffff;
      ${COLORS.CANVAS_SUBTLE}: #f6f8fa;
      ${COLORS.BORDER_DEFAULT}: #d0d7de;
      ${COLORS.BORDER_MUTED}: hsla(210,18%,87%,1);
      ${COLORS.NEUTRAL_MUTED}: rgba(175,184,193,0.2);
      ${COLORS.ACCENT_FG}: #0969da;
      ${COLORS.ACCENT_EMPHASIS}: #0969da;
      ${COLORS.ATTENTION_SUBTLE}: #fff8c5;
      ${COLORS.DANGER_FG}: #cf222e;

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
      ${COLORS.SYNTAX_COMMENT}: #8b949e;
      ${COLORS.SYNTAX_CONSTANT}: #79c0ff;
      ${COLORS.SYNTAX_ENTITY}: #d2a8ff;
      ${COLORS.SYNTAX_STORAGE_MODIFIER_IMPORT}: #c9d1d9;
      ${COLORS.SYNTAX_ENTITY_TAG}: #7ee787;
      ${COLORS.SYNTAX_KEYWORD}: #ff7b72;
      ${COLORS.SYNTAX_STRING}: #a5d6ff;
      ${COLORS.SYNTAX_VARIABLE}: #ffa657;
      ${COLORS.SYNTAX_BRACKETHIGHLIGHTER_UNNMATCHED}: #f85149;
      ${COLORS.SYNTAX_INVALID_ILLEGAL_TEXT}: #f0f6fc;
      ${COLORS.SYNTAX_INVALID_ILLEGAL_BG}: #8e1519;
      ${COLORS.SYNTAX_CARRIAGE_RETURN_TEXT}: #f0f6fc;
      ${COLORS.SYNTAX_CARRIAGE_RETURN_BG}: #b62324;
      ${COLORS.SYNTAX_STRING_REGEXP}: #7ee787;
      ${COLORS.SYNTAX_NARKUP_LIST}: #f2cc60;
      ${COLORS.SYNTAX_MARKUP_HEADING}: #1f6feb;
      ${COLORS.SYNTAX_MARKUP_ITALIC}: #c9d1d9;
      ${COLORS.SYNTAX_MARKUP_BOLD}: #c9d1d9;
      ${COLORS.SYNTAX_MARKUP_DELETED_TEXT}: #ffdcd7;
      ${COLORS.SYNTAX_MARKUP_DELETED_BG}: #67060c;
      ${COLORS.SYNTAX_MARKUP_INSERTED_TEXT}: #aff5b4;
      ${COLORS.SYNTAX_MARKUP_INSERTED_BG}: #033a16;
      ${COLORS.SYNTAX_MARKUP_CHANGED_TEXT}: #ffdfb6;
      ${COLORS.SYNTAX_MARKUP_CHANGED_BG}: #5a1e02;
      ${COLORS.SYNTAX_MARKUP_IGNORED_TEXT}: #c9d1d9;
      ${COLORS.SYNTAX_MARKUP_IGNORED_BG}: #1158c7;
      ${COLORS.SYNTAX_META_DIFF_RANGE}: #d2a8ff;
      ${COLORS.SYNTAX_BRACKETHIGHLIGHTER_ANGLE}: #8b949e;
      ${COLORS.SYNTAX_SUBLIMELINTER_GUTTER_MARK}: #484f58;
      ${COLORS.SYNTAX_CONSTANT_OTHER_REFERENCE_LINK}: #a5d6ff;
      ${COLORS.FG_DEFAULT}: #c9d1d9;
      ${COLORS.FG_MUTED}: #8b949e;
      ${COLORS.FG_SUBTLE}: #484f58;
      ${COLORS.CANVAS_DEFAULT}: var(${GREY[800]});
      ${COLORS.CANVAS_SUBTLE}: var(${GREY[700]});
      ${COLORS.BORDER_DEFAULT}: #30363d;
      ${COLORS.BORDER_MUTED}: #21262d;
      ${COLORS.NEUTRAL_MUTED}: rgba(110,118,129,0.4);
      ${COLORS.ACCENT_FG}: #58a6ff;
      ${COLORS.ACCENT_EMPHASIS}: #1f6feb;
      ${COLORS.ATTENTION_SUBTLE}: rgba(187,128,9,0.15);
      ${COLORS.DANGER_FG}: #f85149;

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
      ${COLORS.SYNTAX_COMMENT}: #8b949e;
      ${COLORS.SYNTAX_CONSTANT}: #79c0ff;
      ${COLORS.SYNTAX_ENTITY}: #d2a8ff;
      ${COLORS.SYNTAX_STORAGE_MODIFIER_IMPORT}: #c9d1d9;
      ${COLORS.SYNTAX_ENTITY_TAG}: #7ee787;
      ${COLORS.SYNTAX_KEYWORD}: #ff7b72;
      ${COLORS.SYNTAX_STRING}: #a5d6ff;
      ${COLORS.SYNTAX_VARIABLE}: #ffa657;
      ${COLORS.SYNTAX_BRACKETHIGHLIGHTER_UNNMATCHED}: #f85149;
      ${COLORS.SYNTAX_INVALID_ILLEGAL_TEXT}: #f0f6fc;
      ${COLORS.SYNTAX_INVALID_ILLEGAL_BG}: #8e1519;
      ${COLORS.SYNTAX_CARRIAGE_RETURN_TEXT}: #f0f6fc;
      ${COLORS.SYNTAX_CARRIAGE_RETURN_BG}: #b62324;
      ${COLORS.SYNTAX_STRING_REGEXP}: #7ee787;
      ${COLORS.SYNTAX_NARKUP_LIST}: #f2cc60;
      ${COLORS.SYNTAX_MARKUP_HEADING}: #1f6feb;
      ${COLORS.SYNTAX_MARKUP_ITALIC}: #c9d1d9;
      ${COLORS.SYNTAX_MARKUP_BOLD}: #c9d1d9;
      ${COLORS.SYNTAX_MARKUP_DELETED_TEXT}: #ffdcd7;
      ${COLORS.SYNTAX_MARKUP_DELETED_BG}: #67060c;
      ${COLORS.SYNTAX_MARKUP_INSERTED_TEXT}: #aff5b4;
      ${COLORS.SYNTAX_MARKUP_INSERTED_BG}: #033a16;
      ${COLORS.SYNTAX_MARKUP_CHANGED_TEXT}: #ffdfb6;
      ${COLORS.SYNTAX_MARKUP_CHANGED_BG}: #5a1e02;
      ${COLORS.SYNTAX_MARKUP_IGNORED_TEXT}: #c9d1d9;
      ${COLORS.SYNTAX_MARKUP_IGNORED_BG}: #1158c7;
      ${COLORS.SYNTAX_META_DIFF_RANGE}: #d2a8ff;
      ${COLORS.SYNTAX_BRACKETHIGHLIGHTER_ANGLE}: #8b949e;
      ${COLORS.SYNTAX_SUBLIMELINTER_GUTTER_MARK}: #484f58;
      ${COLORS.SYNTAX_CONSTANT_OTHER_REFERENCE_LINK}: #a5d6ff;
      ${COLORS.FG_DEFAULT}: #c9d1d9;
      ${COLORS.FG_MUTED}: #8b949e;
      ${COLORS.FG_SUBTLE}: #484f58;
      ${COLORS.CANVAS_DEFAULT}: var(${GREY[800]});
      ${COLORS.CANVAS_SUBTLE}: var(${GREY[700]});
      ${COLORS.BORDER_DEFAULT}: #30363d;
      ${COLORS.BORDER_MUTED}: #21262d;
      ${COLORS.NEUTRAL_MUTED}: rgba(110,118,129,0.4);
      ${COLORS.ACCENT_FG}: #58a6ff;
      ${COLORS.ACCENT_EMPHASIS}: #1f6feb;
      ${COLORS.ATTENTION_SUBTLE}: rgba(187,128,9,0.15);
      ${COLORS.DANGER_FG}: #f85149;

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
