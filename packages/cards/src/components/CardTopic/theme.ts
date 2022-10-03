import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';
import { SHADOW } from '@sbercloud/uikit-product-utils';

const { GREY, WHITE_ALFA, PRESET } = EXPORT_VARS;

export const COLORS = {
  background: {
    default: '--color__cards__card-topic__background__default',
    hover: '--color__cards__card-topic__background__hover',
  },
  shadow: {
    default: '--color__cards__card-topic__background__shadow__default',
    hover: '--color__cards__card-topic__background__shadow__hover',
  },
  image: {
    pink: {
      icon: '--color__cards__card-topic__image__pink__icon',
      background: '--color__cards__card-topic__image__pink__background',
    },
    orange: {
      icon: '--color__cards__card-topic__image__orange__icon',
      background: '--color__cards__card-topic__image__orange__background',
    },
    red: {
      icon: '--color__cards__card-topic__image__red__icon',
      background: '--color__cards__card-topic__image__red__background',
    },
    violet: {
      icon: '--color__cards__card-topic__image__violet__icon',
      background: '--color__cards__card-topic__image__violet__background',
    },
    blue: {
      icon: '--color__cards__card-topic__image__blue__icon',
      background: '--color__cards__card-topic__image__blue__background',
    },
    brown: {
      icon: '--color__cards__card-topic__image__brown__icon',
      background: '--color__cards__card-topic__image__brown__background',
    },
    green: {
      icon: '--color__cards__card-topic__image__green__icon',
      background: '--color__cards__card-topic__image__green__background',
    },
    yellow: {
      icon: '--color__cards__card-topic__image__yellow__icon',
      background: '--color__cards__card-topic__image__yellow__background',
    },
    silver_gray: {
      icon: '--color__cards__card-topic__image__silver_gray__icon',
      background: '--color__cards__card-topic__image__silver_gray__background',
    },
    charcoal_gray: {
      icon: '--color__cards__card-topic__image__charcoal_gray__icon',
      background: '--color__cards__card-topic__image__charcoal_gray__background',
    },
    grass: {
      icon: '--color__cards__card-topic__image__grass__icon',
      background: '--color__cards__card-topic__image__grass__background',
    },
    seamount: {
      icon: '--color__cards__card-topic__image__seamount__icon',
      background: '--color__cards__card-topic__image__seamount__background',
    },
  },
  title: '--color__cards__card-topic__title',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.hover}: var(${GREY[0]});

      ${COLORS.shadow.default}: ${SHADOW.SMALL};
      ${COLORS.shadow.hover}: ${SHADOW.MEDIUM};

      ${COLORS.title}: var(${GREY[800]});

      ${COLORS.image.pink.icon}: var(${PRESET.PINK_DARK});
      ${COLORS.image.pink.background}: var(${PRESET.PINK_LIGHT});

      ${COLORS.image.orange.icon}: var(${PRESET.ORANGE_DARK});
      ${COLORS.image.orange.background}: var(${PRESET.ORANGE_LIGHT});

      ${COLORS.image.red.icon}: var(${PRESET.RED_DARK});
      ${COLORS.image.red.background}: var(${PRESET.RED_LIGHT});

      ${COLORS.image.violet.icon}: var(${PRESET.VIOLET_DARK});
      ${COLORS.image.violet.background}: var(${PRESET.VIOLET_LIGHT});

      ${COLORS.image.blue.icon}: var(${PRESET.BLUE_DARK});
      ${COLORS.image.blue.background}: var(${PRESET.BLUE_LIGHT});

      ${COLORS.image.brown.icon}: var(${PRESET.BROWN_DARK});
      ${COLORS.image.brown.background}: var(${PRESET.BROWN_LIGHT});

      ${COLORS.image.green.icon}: var(${PRESET.GREEN_DARK});
      ${COLORS.image.green.background}: var(${PRESET.GREEN_LIGHT});

      ${COLORS.image.yellow.icon}: var(${PRESET.YELLOW_DARK});
      ${COLORS.image.yellow.background}: var(${PRESET.YELLOW_LIGHT});

      ${COLORS.image.silver_gray.icon}: var(${PRESET.SILVER_GRAY_DARK});
      ${COLORS.image.silver_gray.background}: var(${PRESET.SILVER_GRAY_LIGHT});

      ${COLORS.image.charcoal_gray.icon}: var(${PRESET.CHARCOAL_GRAY_DARK});
      ${COLORS.image.charcoal_gray.background}: var(${PRESET.CHARCOAL_GRAY_LIGHT});

      ${COLORS.image.grass.icon}: var(${PRESET.GRASS_DARK});
      ${COLORS.image.grass.background}: var(${PRESET.GRASS_LIGHT});

      ${COLORS.image.seamount.icon}: var(${PRESET.SEAMOUNT_DARK});
      ${COLORS.image.seamount.background}: var(${PRESET.SEAMOUNT_LIGHT});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.default}: var(${WHITE_ALFA[4]});
      ${COLORS.background.hover}: var(${WHITE_ALFA[8]});

      ${COLORS.shadow.default}: none;
      ${COLORS.shadow.hover}: none;

      ${COLORS.title}: var(${GREY[0]});

      ${COLORS.image.pink.icon}: var(${PRESET.PINK_LIGHT});
      ${COLORS.image.pink.background}: var(${PRESET.PINK_DARK});

      ${COLORS.image.orange.icon}: var(${PRESET.ORANGE_LIGHT});
      ${COLORS.image.orange.background}: var(${PRESET.ORANGE_DARK});

      ${COLORS.image.red.icon}: var(${PRESET.RED_LIGHT});
      ${COLORS.image.red.background}: var(${PRESET.RED_DARK});

      ${COLORS.image.violet.icon}: var(${PRESET.VIOLET_LIGHT});
      ${COLORS.image.violet.background}: var(${PRESET.VIOLET_DARK});

      ${COLORS.image.blue.icon}: var(${PRESET.BLUE_LIGHT});
      ${COLORS.image.blue.background}: var(${PRESET.BLUE_DARK});

      ${COLORS.image.brown.icon}: var(${PRESET.BROWN_LIGHT});
      ${COLORS.image.brown.background}: var(${PRESET.BROWN_DARK});

      ${COLORS.image.green.icon}: var(${PRESET.GREEN_LIGHT});
      ${COLORS.image.green.background}: var(${PRESET.GREEN_DARK});

      ${COLORS.image.yellow.icon}: var(${PRESET.YELLOW_LIGHT});
      ${COLORS.image.yellow.background}: var(${PRESET.YELLOW_DARK});

      ${COLORS.image.silver_gray.icon}: var(${PRESET.SILVER_GRAY_LIGHT});
      ${COLORS.image.silver_gray.background}: var(${PRESET.SILVER_GRAY_DARK});

      ${COLORS.image.charcoal_gray.icon}: var(${PRESET.CHARCOAL_GRAY_LIGHT});
      ${COLORS.image.charcoal_gray.background}: var(${PRESET.CHARCOAL_GRAY_DARK});

      ${COLORS.image.grass.icon}: var(${PRESET.GRASS_LIGHT});
      ${COLORS.image.grass.background}: var(${PRESET.GRASS_DARK});

      ${COLORS.image.seamount.icon}: var(${PRESET.SEAMOUNT_LIGHT});
      ${COLORS.image.seamount.background}: var(${PRESET.SEAMOUNT_DARK});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.hover}: var(${GREY[0]});

      ${COLORS.shadow.default}: ${SHADOW.SMALL};
      ${COLORS.shadow.hover}: ${SHADOW.MEDIUM};

      ${COLORS.title}: var(${GREY[800]});

      ${COLORS.image.pink.icon}: var(${PRESET.PINK_DARK});
      ${COLORS.image.pink.background}: var(${PRESET.PINK_LIGHT});

      ${COLORS.image.orange.icon}: var(${PRESET.ORANGE_DARK});
      ${COLORS.image.orange.background}: var(${PRESET.ORANGE_LIGHT});

      ${COLORS.image.red.icon}: var(${PRESET.RED_DARK});
      ${COLORS.image.red.background}: var(${PRESET.RED_LIGHT});

      ${COLORS.image.violet.icon}: var(${PRESET.VIOLET_DARK});
      ${COLORS.image.violet.background}: var(${PRESET.VIOLET_LIGHT});

      ${COLORS.image.blue.icon}: var(${PRESET.BLUE_DARK});
      ${COLORS.image.blue.background}: var(${PRESET.BLUE_LIGHT});

      ${COLORS.image.brown.icon}: var(${PRESET.BROWN_DARK});
      ${COLORS.image.brown.background}: var(${PRESET.BROWN_LIGHT});

      ${COLORS.image.green.icon}: var(${PRESET.GREEN_DARK});
      ${COLORS.image.green.background}: var(${PRESET.GREEN_LIGHT});

      ${COLORS.image.yellow.icon}: var(${PRESET.YELLOW_DARK});
      ${COLORS.image.yellow.background}: var(${PRESET.YELLOW_LIGHT});

      ${COLORS.image.silver_gray.icon}: var(${PRESET.SILVER_GRAY_DARK});
      ${COLORS.image.silver_gray.background}: var(${PRESET.SILVER_GRAY_LIGHT});

      ${COLORS.image.charcoal_gray.icon}: var(${PRESET.CHARCOAL_GRAY_DARK});
      ${COLORS.image.charcoal_gray.background}: var(${PRESET.CHARCOAL_GRAY_LIGHT});

      ${COLORS.image.grass.icon}: var(${PRESET.GRASS_DARK});
      ${COLORS.image.grass.background}: var(${PRESET.GRASS_LIGHT});

      ${COLORS.image.seamount.icon}: var(${PRESET.SEAMOUNT_DARK});
      ${COLORS.image.seamount.background}: var(${PRESET.SEAMOUNT_LIGHT});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.default}: var(${WHITE_ALFA[4]});
      ${COLORS.background.hover}: var(${WHITE_ALFA[8]});

      ${COLORS.shadow.default}: none;
      ${COLORS.shadow.hover}: none;

      ${COLORS.title}: var(${GREY[0]});

      ${COLORS.image.pink.icon}: var(${PRESET.PINK_LIGHT});
      ${COLORS.image.pink.background}: var(${PRESET.PINK_DARK});

      ${COLORS.image.orange.icon}: var(${PRESET.ORANGE_LIGHT});
      ${COLORS.image.orange.background}: var(${PRESET.ORANGE_DARK});

      ${COLORS.image.red.icon}: var(${PRESET.RED_LIGHT});
      ${COLORS.image.red.background}: var(${PRESET.RED_DARK});

      ${COLORS.image.violet.icon}: var(${PRESET.VIOLET_LIGHT});
      ${COLORS.image.violet.background}: var(${PRESET.VIOLET_DARK});

      ${COLORS.image.blue.icon}: var(${PRESET.BLUE_LIGHT});
      ${COLORS.image.blue.background}: var(${PRESET.BLUE_DARK});

      ${COLORS.image.brown.icon}: var(${PRESET.BROWN_LIGHT});
      ${COLORS.image.brown.background}: var(${PRESET.BROWN_DARK});

      ${COLORS.image.green.icon}: var(${PRESET.GREEN_LIGHT});
      ${COLORS.image.green.background}: var(${PRESET.GREEN_DARK});

      ${COLORS.image.yellow.icon}: var(${PRESET.YELLOW_LIGHT});
      ${COLORS.image.yellow.background}: var(${PRESET.YELLOW_DARK});

      ${COLORS.image.silver_gray.icon}: var(${PRESET.SILVER_GRAY_LIGHT});
      ${COLORS.image.silver_gray.background}: var(${PRESET.SILVER_GRAY_DARK});

      ${COLORS.image.charcoal_gray.icon}: var(${PRESET.CHARCOAL_GRAY_LIGHT});
      ${COLORS.image.charcoal_gray.background}: var(${PRESET.CHARCOAL_GRAY_DARK});

      ${COLORS.image.grass.icon}: var(${PRESET.GRASS_LIGHT});
      ${COLORS.image.grass.background}: var(${PRESET.GRASS_DARK});

      ${COLORS.image.seamount.icon}: var(${PRESET.SEAMOUNT_LIGHT});
      ${COLORS.image.seamount.background}: var(${PRESET.SEAMOUNT_DARK});
    }
  }
`;
