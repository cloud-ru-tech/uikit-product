import { useMemo } from 'react';

import { HomeOutlineInterfaceSVG, RefreshInterfaceSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { isBrowser } from '@snack-uikit/utils';

import { ErrorType } from './constants';

export function useGetContentByErrorType(errorType: ErrorType) {
  const { t } = useLocale('ErrorPage');

  return useMemo(() => {
    switch (errorType) {
      case ErrorType.PageUnavailable:
        return {
          title: t('pageUnavailableTitle'),
          text: t('actionRedirectTitle'),
          statusCode: 403,
        };
      case ErrorType.PageNotFound:
        return {
          title: t('pageNotFoundTitle'),
          text: t('actionRedirectTitle'),
          statusCode: 404,
        };
      case ErrorType.Offline:
        return {
          title: t('offlineTitle'),
          text: t('offlineText'),
        };
      case ErrorType.Redirect:
        return {
          title: t('redirectTitle'),
          text: t('redirectText'),
        };
      case ErrorType.FrontendError:
      default:
        return {
          title: t('frontendErrorTitle'),
          text: t('actionRedirectTitle'),
        };
    }
  }, [errorType, t]);
}

export function useGetButtonPropsByErrorType(errorType: ErrorType, mainPageUrl?: string) {
  const { t } = useLocale('ErrorPage');

  return useMemo(() => {
    switch (errorType) {
      case ErrorType.PageNotFound:
      case ErrorType.PageUnavailable:
        return {
          text: t('mainPageLink'),
          icon: <HomeOutlineInterfaceSVG />,
          href: mainPageUrl,
        };
      case ErrorType.Redirect:
        return {
          text: t('redirectButton'),
          href: mainPageUrl,
        };
      default:
        return {
          text: t('refreshButton'),
          icon: <RefreshInterfaceSVG />,
          onClick: () => isBrowser() && window.location.reload(),
        };
    }
  }, [errorType, mainPageUrl, t]);
}
