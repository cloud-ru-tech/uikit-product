import { Texts } from '../helpers/texts-provider';
import { CloudLogo, MlSpaceLogo } from './styled';

export enum LogoVariant {
  MLSpace = 'MLSpace',
  Cloud = 'Cloud',
  None = 'None',
}

export enum ErrorType {
  FrontendError = 'FrontendError',
  PageUnavailable = 'PageUnavailable',
  PageNotFound = 'PageNotFound',
}

export function getLogoByVariant(logoVariant: LogoVariant) {
  switch (logoVariant) {
    case LogoVariant.MLSpace:
      return <MlSpaceLogo height={24} />;
    case LogoVariant.Cloud:
    default:
      return <CloudLogo height={24} />;
  }
}

export const getTitleByErrorType = (errorType: ErrorType) => {
  switch (errorType) {
    case ErrorType.PageUnavailable:
      return {
        text: Texts.PageUnavailableTitle,
        statusCode: 403,
      };
    case ErrorType.PageNotFound:
      return {
        text: Texts.PageNotFoundTitle,
        statusCode: 404,
      };
    case ErrorType.FrontendError:
    default:
      return {
        text: Texts.FrontendErrorTitle,
      };
  }
};
