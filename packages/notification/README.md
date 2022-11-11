# React Notification

## Installation
`npm i @sbercloud/uikit-product-notification`

[Changelog](./CHANGELOG.md)

## Short Usage

Краткий формат нотификаций вызывает кастомный эвент, соответственно в вашем приложении должен быть реализован слушатель.
Решение со эвентами является временным. 

Для Single-Spa приложений правильным способом является использования `@sbercloud/spa-store` 
для вызова нотификации. 

Краткое API напрямую из пакета `@sbercloud/uikit-product-notification` могут использовать только 
`MF` приложения, которые в момент миграции на Single-Spa должны перейти на использование `@sbercloud/spa-store`.

```typescript
import { notification } from '@sbercloud/uikit-product-notification';

// create small notification
const smallId = await notification.small.success({ text });

// create big notification
const bigId = await notification.big.success({ title, description });

// update small notification
notification.small.update.error(smallId, { text: 'new text' });

// update big notification
notification.big.update.error(bigId, {
    title: 'new text',
    description: 'new description',
});

// dismiss small notification
notification.small.dismiss(smallId);

// dismiss big notification
notification.big.dismiss(bigId);
```

## Usage
### You only need a hook to use a notification, see available props in types

```typescript
import { openNotification, NotificationType } from '@sbercloud/uikit-product-notification';

const clickToOpen = () => {
  openNotification({
    type: NotificationType.Big,
    notificationProps: {/* notificationProps */ },
    containerProps: {/* containerProps if needed */ },
    notificationOptions: {/* notificationOptions if needed */},
  });
};
```

### Updating a Notification
See an example in [NotificationSmall Story](/packages/notification/stories/NotificationSmall.tsx) or [NotificationBig Story](/packages/notification/stories/NotificationBig.tsx)

```typescript
import { openNotification, updateNotification, NotificationType } from '@sbercloud/uikit-product-notification';

const NOTIFICATION_ID = 'testBig';

// you could pass an id manually
const clickToOpen = () => {
  openNotification({
    type: NotificationType.Big,
    notificationProps: {/* notificationProps */ },
    containerProps: {/* containerProps if needed */ },
    notificationOptions: {
      id: NOTIFICATION_ID,
      /* other notificationOptions if needed */
    },
  });
};

// or await to get automatically generated id
const clickToOpenAsync = async () => {
  const notificationId = await openNotification({
    type: NotificationType.Big, 
    notificationProps: {/* notificationProps */ },
    containerProps: {/* containerProps if needed */ }, 
    notificationOptions: {/* notificationOptions if needed */},
  });
};

const clickToUpdate = () => {
  updateNotification(NOTIFICATION_ID, {
    type: NotificationType.Big,
    notificationProps: {/* props you need to update */},
    notificationOptions: {/* notificationOptions if needed */},
  });
};
```

## Props

```typescript
type NotificationOptions = {
  id?: RtToastOptions['toastId'];
  autoClose?: RtToastOptions['autoClose'];
  onClose?: RtToastOptions['onClose'];
};

enum NotificationType {
  Big = 'Big',
  Small = 'Small',
}

type NotificationPropsMap = {
  [NotificationType.Small]: NotificationSmallProps;
  [NotificationType.Big]: NotificationBigProps;
};

type OpenNotificationProps<T extends keyof NotificationPropsMap> = {
  type: T;
  notificationProps?: NotificationPropsMap[T];
  containerProps?: NotificationContainerProps;
  notificationOptions?: NotificationOptions;
  customNotification?: JSX.Element;
  notificationParent?: HTMLDivElement;
};

type DefaultOrCustomNotification<T extends keyof NotificationPropsMap> =
  | {
  notificationProps: NotificationPropsMap[T];
}
  | {
  customNotification: JSX.Element;
};

type OpenNotification = <T extends keyof NotificationPropsMap>(
  props: DefaultOrCustomNotification<T> & OpenNotificationProps<T>,
) => Promise<ReactText | undefined>;

type UpdateNotification = <T extends keyof NotificationPropsMap>(
  id: string | number,
  props: {
    type: T;
    notificationProps?: NotificationPropsMap[T];
    notificationOptions?: NotificationOptions;
    containerId?: NotificationContainerProps['containerId'];
    customNotification?: JSX.Element;
  },
) => void;
```

### NotificationContainer

```typescript
type NotificationContainerProps = {
  position?: NotificationPosition;
  limit?: number;
  containerId?: RtNotificationContainerProps['containerId'];
};
```

### NotificationBig
```typescript
enum NotificationBigStatus {
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning',
  WarningCritical = 'WarningCritical',
  WarningAlarm = 'WarningAlarm',
  Error = 'Error',
  ErrorAlarm = 'ErrorAlarm',
}

type NotificationBigAction = {
  text: string;
  onClick(e: MouseEvent<HTMLButtonElement | HTMLDivElement>, close?: () => void): void;
};

type NotificationBigProps = Partial<NotificationContentProps> & {
  title: ReactNode;
  description?: string;
  status?: NotificationBigStatus;
  actions?: NotificationBigAction[];
  onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
};
```

### NotificationSmall
```typescript
enum NotificationSmallStatus {
  Success = 'Success',
  Error = 'Error',
  Neutral = 'Neutral',
  Loading = 'Loading',
}

type NotificationSmallAction = {
  text: string;
  onClick(e: MouseEvent<HTMLButtonElement | HTMLDivElement>, close: () => void): void;
};

type NotificationSmallCommonProps = Partial<RtToastContentProps> & {
  text: string;
  status?: NotificationSmallStatus;
};

type NotificationSmallPropsWithAction = NotificationSmallCommonProps & {
  action: NotificationSmallAction;
  closeToast: () => void;
};

type NotificationSmallProps = NotificationSmallCommonProps | NotificationSmallPropsWithAction;
```
