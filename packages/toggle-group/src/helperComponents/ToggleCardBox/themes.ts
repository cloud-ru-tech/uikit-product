import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  border: {
    unselected: {
      default: '--color-toggle-group__toggle-card-box-border-unselected__default',
      hover: '--color-toggle-group__toggle-card-box-border-unselected__hover',
      disabled: '--color-toggle-group__toggle-card-box-border-unselected__disabled',
    },
    selected: {
      default: '--color-toggle-group__toggle-card-box-border-selected__default',
      hover: '--color-toggle-group__toggle-card-box-border-selected__hover',
      disabled: '--color-toggle-group__toggle-card-box-border-selected__disabled',
    },
  },
  background: {
    unselected: {
      disabled: '--color-toggle-group__toggle-card-box-background-unselected__disabled',
    },
    selected: {
      default: '--color-toggle-group__toggle-card-box-background-selected__default',
      disabled: '--color-toggle-group__toggle-card-box-background-selected__disabled',
    },
  },
};

export const TITLE_COLORS = {
  text: {
    unselected: {
      default: '--color-toggle-group__toggle-card-box-title-text-unselected__default',
      disabled: '--color-toggle-group__toggle-card-box-title-text-unselected__disabled',
    },
    selected: {
      disabled: '--color-toggle-group__toggle-card-box-title-text-selected__disabled',
    },
  },
};

export const DESCRIPTION_COLORS = {
  text: {
    unselected: {
      default: '--color-toggle-group__toggle-card-box-description-text-unselected__default',
      disabled: '--color-toggle-group__toggle-card-box-description-text-unselected__disabled',
    },
    selected: {
      disabled: '--color-toggle-group__toggle-card-box-description-text-selected__disabled',
    },
  },
};

export const CAPTION_COLORS = {
  text: {
    default: '--color-toggle-group__toggle-card-box-caption-text__default',
    disabled: '--color-toggle-group__toggle-card-box-caption-text__disabled',
  },
};

export const ICON_COLORS = {
  fill: {
    unselected: {
      default: '--color-toggle-group__toggle-card-box-icon-fill-unselected__default',
      hover: '--color-toggle-group__toggle-card-box-icon-fill-unselected__hover',
      disabled: '--color-toggle-group__toggle-card-box-icon-fill-unselected__disabled',
    },
    selected: {
      default: '--color-toggle-group__toggle-card-box-icon-fill-selected__default',
      hover: '--color-toggle-group__toggle-card-box-icon-fill-selected__hover',
      disabled: '--color-toggle-group__toggle-card-box-icon-fill-selected__disabled',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.border.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${COLORS.border.unselected.hover}: var(${EXPORT_VARS.PURPLE[115]});
      ${COLORS.border.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.background.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.border.selected.default}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.border.selected.hover}: var(${EXPORT_VARS.PURPLE[115]});
      ${COLORS.border.selected.disabled}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.PURPLE_ALFA[4]});
      ${COLORS.background.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[4]});

      ${TITLE_COLORS.text.unselected.default}: var(${EXPORT_VARS.GREY[800]});
      ${TITLE_COLORS.text.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${TITLE_COLORS.text.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[48]});

      ${DESCRIPTION_COLORS.text.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[48]});
      ${DESCRIPTION_COLORS.text.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${DESCRIPTION_COLORS.text.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[48]});

      ${CAPTION_COLORS.text.default}: var(${EXPORT_VARS.GREY[350]});
      ${CAPTION_COLORS.text.disabled}: var(${EXPORT_VARS.BLACK_ALFA[16]});

      ${ICON_COLORS.fill.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${ICON_COLORS.fill.unselected.hover}: var(${EXPORT_VARS.PURPLE[115]});
      ${ICON_COLORS.fill.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${ICON_COLORS.fill.selected.default}: var(${EXPORT_VARS.PURPLE[100]});
      ${ICON_COLORS.fill.selected.hover}: var(${EXPORT_VARS.PURPLE[115]});
      ${ICON_COLORS.fill.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.border.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${COLORS.border.unselected.hover}: var(${EXPORT_VARS.PURPLE[25]});
      ${COLORS.border.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${COLORS.background.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${COLORS.border.selected.default}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.border.selected.hover}: var(${EXPORT_VARS.PURPLE[25]});
      ${COLORS.border.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.PURPLE_ALFA[8]});
      ${COLORS.background.selected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[4]});

      ${TITLE_COLORS.text.unselected.default}: var(${EXPORT_VARS.GREY[100]});
      ${TITLE_COLORS.text.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${TITLE_COLORS.text.selected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[48]});

      ${DESCRIPTION_COLORS.text.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${DESCRIPTION_COLORS.text.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${DESCRIPTION_COLORS.text.selected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[48]});

      ${CAPTION_COLORS.text.default}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${CAPTION_COLORS.text.disabled}: var(${EXPORT_VARS.WHITE_ALFA[16]});

      ${ICON_COLORS.fill.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${ICON_COLORS.fill.unselected.hover}: var(${EXPORT_VARS.PURPLE[25]});
      ${ICON_COLORS.fill.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[16]});
      ${ICON_COLORS.fill.selected.default}: var(${EXPORT_VARS.PURPLE[50]});
      ${ICON_COLORS.fill.selected.hover}: var(${EXPORT_VARS.PURPLE[25]});
      ${ICON_COLORS.fill.selected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.border.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${COLORS.border.unselected.hover}: var(${EXPORT_VARS.GREEN[115]});
      ${COLORS.border.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.background.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.border.selected.default}: var(${EXPORT_VARS.GREEN[100]});
      ${COLORS.border.selected.hover}: var(${EXPORT_VARS.GREEN[115]});
      ${COLORS.border.selected.disabled}: var(${EXPORT_VARS.GREEN[100]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.GREEN_ALFA[4]});
      ${COLORS.background.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[4]});

      ${TITLE_COLORS.text.unselected.default}: var(${EXPORT_VARS.GREY[800]});
      ${TITLE_COLORS.text.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${TITLE_COLORS.text.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[48]});

      ${DESCRIPTION_COLORS.text.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[48]});
      ${DESCRIPTION_COLORS.text.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${DESCRIPTION_COLORS.text.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[48]});

      ${CAPTION_COLORS.text.default}: var(${EXPORT_VARS.GREY[350]});
      ${CAPTION_COLORS.text.disabled}: var(${EXPORT_VARS.BLACK_ALFA[16]});

      ${ICON_COLORS.fill.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${ICON_COLORS.fill.unselected.hover}: var(${EXPORT_VARS.GREEN[115]});
      ${ICON_COLORS.fill.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${ICON_COLORS.fill.selected.default}: var(${EXPORT_VARS.GREEN[100]});
      ${ICON_COLORS.fill.selected.hover}: var(${EXPORT_VARS.GREEN[115]});
      ${ICON_COLORS.fill.selected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.border.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${COLORS.border.unselected.hover}: var(${EXPORT_VARS.GREEN[25]});
      ${COLORS.border.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${COLORS.background.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${COLORS.border.selected.default}: var(${EXPORT_VARS.GREEN[50]});
      ${COLORS.border.selected.hover}: var(${EXPORT_VARS.GREEN[25]});
      ${COLORS.border.selected.disabled}: var(${EXPORT_VARS.GREEN[50]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.GREEN_ALFA[8]});
      ${COLORS.background.selected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[4]});

      ${TITLE_COLORS.text.unselected.default}: var(${EXPORT_VARS.GREY[100]});
      ${TITLE_COLORS.text.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${TITLE_COLORS.text.selected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[48]});

      ${DESCRIPTION_COLORS.text.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${DESCRIPTION_COLORS.text.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${DESCRIPTION_COLORS.text.selected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[48]});

      ${CAPTION_COLORS.text.default}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${CAPTION_COLORS.text.disabled}: var(${EXPORT_VARS.WHITE_ALFA[16]});

      ${ICON_COLORS.fill.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${ICON_COLORS.fill.unselected.hover}: var(${EXPORT_VARS.GREEN[25]});
      ${ICON_COLORS.fill.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[16]});
      ${ICON_COLORS.fill.selected.default}: var(${EXPORT_VARS.GREEN[50]});
      ${ICON_COLORS.fill.selected.hover}: var(${EXPORT_VARS.GREEN[25]});
      ${ICON_COLORS.fill.selected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[24]});
    }
  }
`;
