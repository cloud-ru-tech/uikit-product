# Siteheader

## Installation
`npm i @cloud-ru/uikit-product-site-header`

[Changelog](./CHANGELOG.md)

SiteHeader

## Управляемая видимость

По умолчанию `SiteHeaderBasic` сам скрывается при прокрутке вниз и появляется при прокрутке вверх.
Передайте `visible`, чтобы управлять видимостью извне — например, скрывать хедер при переходах по якорям
и согласовывать его положение с навигацией страницы. При заданном `visible` внутренняя реакция на прокрутку отключается.

```tsx
<SiteHeaderBasic {...props} visible={showHeader} />
```
