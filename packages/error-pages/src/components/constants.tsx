import { HomeOutlineInterfaceSVG, RefreshInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { isBrowser } from '@snack-uikit/utils';

import { Texts } from '../helpers/texts-provider';

export enum LogoVariant {
  MLSpace = 'MLSpace',
  Cloud = 'Cloud',
  None = 'None',
}

export enum ErrorType {
  FrontendError = 'FrontendError',
  PageUnavailable = 'PageUnavailable',
  PageNotFound = 'PageNotFound',
  Offline = 'Offline',
  Redirect = 'Redirect',
}

export function getContentByErrorType(errorType: ErrorType) {
  switch (errorType) {
    case ErrorType.PageUnavailable:
      return {
        title: Texts.PageUnavailableTitle,
        text: Texts.ActionRedirectTitle,
        statusCode: 403,
      };
    case ErrorType.PageNotFound:
      return {
        title: Texts.PageNotFoundTitle,
        text: Texts.ActionRedirectTitle,
        statusCode: 404,
      };
    case ErrorType.Offline:
      return {
        title: Texts.OfflineTitle,
        text: Texts.OfflineText,
      };
    case ErrorType.Redirect:
      return {
        title: Texts.RedirectTitle,
        text: Texts.RedirectText,
      };
    case ErrorType.FrontendError:
    default:
      return {
        title: Texts.FrontendErrorTitle,
        text: Texts.ActionRedirectTitle,
      };
  }
}

export function getButtonPropsByErrorType(errorType: ErrorType, mainPageUrl?: string) {
  switch (errorType) {
    case ErrorType.PageNotFound:
    case ErrorType.PageUnavailable:
      return {
        text: Texts.MainPageLink,
        icon: <HomeOutlineInterfaceSVG />,
        href: mainPageUrl,
      };
    case ErrorType.Redirect:
      return {
        text: Texts.RedirectButton,
        href: mainPageUrl,
      };
    default:
      return {
        text: Texts.RefreshButton,
        icon: <RefreshInterfaceSVG />,
        onClick: () => isBrowser() && window.location.reload(),
      };
  }
}

export const COLORS = {
  svgExclamationMark: '--svgExclamationMark',
  svgStroke: '--svgStroke',
  svgBackground: '--svgBackground',
};
