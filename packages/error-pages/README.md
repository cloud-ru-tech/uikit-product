# Error Pages

## Installation
`npm i @sbercloud/uikit-product-error-pages`

## Props

```ts
enum LogoVariant {
  MLSpace = 'MLSpace',
  Cloud = 'Cloud',
  None = 'None',
}

enum ErrorType {
  FrontendError = 'FrontendError',
  PageUnavailable = 'PageUnavailable',
  PageNotFound = 'PageNotFound',
}

type ErrorPageProps = WithSupportProps<{
  className: string;
  mainPageUrl: string;
  onSupportCenterClick(): void;
  logoVariant?: LogoVariant;
  errorType?: ErrorType;
}>;
```


