import { ReactNode, useMemo } from 'react';

import {
  CloudFullLogoSVG,
  HomeOutlineInterfaceSVG,
  MlSpaceFullLogoSVG,
  RefreshInterfaceSVG,
} from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { isBrowser } from '@snack-uikit/utils';

import { ErrorType, LogoVariant } from './constants';
import styles from './styles.module.scss';
import type { ErrorTypeConfig, MainButtonConfig } from './types';

export function useGetContentByErrorType({ errorType, custom }: ErrorTypeConfig) {
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
      case ErrorType.Custom:
        return {
          title: custom?.title ?? t('frontendErrorTitle'),
          text: custom?.text ?? t('actionRedirectTitle'),
          statusCode: custom?.statusCode,
        };
      case ErrorType.FrontendError:
      default:
        return {
          title: t('frontendErrorTitle'),
          text: t('actionRedirectTitle'),
        };
    }
  }, [custom?.statusCode, custom?.text, custom?.title, errorType, t]);
}

export type UseGetButtonPropsByErrorTypeParams = ErrorTypeConfig & {
  mainPageUrl?: string;
};

export function useGetButtonPropsByErrorType({ errorType, mainPageUrl, custom }: UseGetButtonPropsByErrorTypeParams) {
  const { t } = useLocale('ErrorPage');

  return useMemo((): MainButtonConfig => {
    switch (true) {
      case errorType === ErrorType.PageNotFound:
      case errorType === ErrorType.PageUnavailable:
        return {
          label: t('mainPageLink'),
          icon: <HomeOutlineInterfaceSVG />,
          href: mainPageUrl,
        };
      case errorType === ErrorType.Redirect:
        return {
          label: t('redirectButton'),
          href: mainPageUrl,
        };
      case Boolean(errorType === ErrorType.Custom && custom?.mainButton):
        return {
          label: custom?.mainButton?.label,
          icon: custom?.mainButton?.icon,
          href: custom?.mainButton?.href,
          onClick: custom?.mainButton?.onClick,
        };
      default:
        return {
          label: t('refreshButton'),
          icon: <RefreshInterfaceSVG />,
          onClick: () => isBrowser() && window.location.reload(),
        };
    }
  }, [custom, errorType, mainPageUrl, t]);
}

export function useLogoNode(logoVariant: LogoVariant, logo?: ReactNode, withWrapper = true) {
  return useMemo(() => {
    const wrap = (node: ReactNode) => (withWrapper ? <div className={styles.logo}>{node}</div> : node);

    switch (true) {
      case logoVariant === LogoVariant.MLSpace:
        return wrap(<MlSpaceFullLogoSVG />);
      case logoVariant === LogoVariant.Cloud:
        return wrap(<CloudFullLogoSVG />);
      case Boolean(logoVariant === LogoVariant.Custom && logo):
        return wrap(logo);
      case logoVariant === LogoVariant.None:
      default:
        return null;
    }
  }, [logo, logoVariant, withWrapper]);
}
