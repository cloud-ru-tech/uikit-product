import { LanguageCodeType, LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../helpers';
import aiVideo from './assets/ai.mp4';
import aiPreview from './assets/ai.png';
import iaasVideo from './assets/iaas.mp4';
import iaasPreview from './assets/iaas.png';
import paasVideo from './assets/paas.mp4';
import paasPreview from './assets/paas.png';
import { Type } from './types';

export const getValueTypographyProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return { purpose: 'headline', size: 'l' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'display', size: 'l' };
  }
};

export const getLabelTypographyProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return { purpose: 'label', size: 'l' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'title', size: 'm' };
  }
};

type CardDetails = {
  /** Видео */
  src: string;
  /** Превью-изображение */
  poster: string;
  /** Заголовок карточки, значение */
  value: string;
  /** Подзаголовок карточки */
  label: string;
  /** Описание карточки */
  description: string;
};

const notReachable = (_: unknown): never => {
  throw new Error(`Should never be reached ${_}`);
};

export const getCardDetails = (type: Type, languageCode: LanguageCodeType): CardDetails => {
  switch (type) {
    case 'iaas':
      return {
        src: iaasVideo,
        poster: iaasPreview,
        value: textProvider<string>(languageCode, Texts.IaasValue),
        label: textProvider<string>(languageCode, Texts.IaasLabel),
        description: textProvider<string>(languageCode, Texts.IaasDescription),
      };

    case 'paas':
      return {
        src: paasVideo,
        poster: paasPreview,
        value: textProvider<string>(languageCode, Texts.PaasValue),
        label: textProvider<string>(languageCode, Texts.PaasLabel),
        description: textProvider<string>(languageCode, Texts.PaasDescription),
      };

    case 'ai':
      return {
        src: aiVideo,
        poster: aiPreview,
        value: textProvider<string>(languageCode, Texts.AiValue),
        label: textProvider<string>(languageCode, Texts.AiLabel),
        description: textProvider<string>(languageCode, Texts.AiDescription),
      };

    default:
      return notReachable(type);
  }
};
