# React Toaster

## Installation
`npm i @sbercloud/uikit-product-toaster`

[Changelog](./CHANGELOG.md)

## Usage
### You only need a hook to use a toaster, see available props in types

```typescript
const { openToast, types } = useToast();

const clickToOpen = () => {
  openToast({
    type: types.Big,
    toastProps: {/* toastProps */ },
    containerProps: {/* containerProps if needed */ },
    toastOptions: {/* toastOptions if needed */},
  });
};
```

### Updating a Toaster
See an example in [ToasterSmall Story](/packages/toaster/stories/ToasterSmall.tsx) or [ToasterBig Story](/packages/toaster/stories/ToasterBig.tsx)

```typescript
const { openToast, updateToast, types, statuses } = useToast();

const TOAST_ID = 'testBig';

// you could pass an id manually
const clickToOpen = () => {
  openToast({
    type: types.Big,
    toastProps: {/* toastProps */ },
    containerProps: {/* containerProps if needed */ },
    toastOptions: {
      id: TOAST_ID,
      /* other toastOptions if needed */
    },
  });
};

// or await to get automatically generated id
const clickToOpenAsync = async () => {
  const toastId = await openToast({
    type: types.Big,
    toastProps: {/* toastProps */ },
    containerProps: {/* containerProps if needed */ },
    toastOptions: {/* toastOptions if needed */},
  });
};

const clickToUpdate = () => {
  updateToast(TOAST_ID, {
    type: types.Big,
    toastProps: {/* props you need to update */},
    toastOptions: {/* toastOptions if needed */},
  });
};
```

## Props

### useToast

```typescript
type ToastOptions = {
  id?: RtToastOptions['toastId'];
  autoClose?: RtToastOptions['autoClose'];
  onClose?: RtToastOptions['onClose'];
};

enum ToastType {
  Big = 'Big',
  Small = 'Small',
}

type ToastPropsMap = {
  [ToastType.Small]: ToasterSmallProps;
  [ToastType.Big]: ToasterBigProps;
};

type OpenToast = <T extends keyof ToastPropsMap>({
  type,
  toastProps,
  containerProps,
  toastOptions,
}: {
  type: T;
  toastProps: ToastPropsMap[T];
  containerProps?: ToasterContainerProps;
  toastOptions?: ToastOptions;
}) => Promise<ReactText | undefined>;

type UpdateToast = <T extends keyof ToastPropsMap>(
  id: string | number,
  {
    type,
    toastProps,
    toastOptions,
    containerId,
  }: {
    type: T;
    toastProps: ToastPropsMap[T];
    toastOptions?: ToastOptions;
    containerId?: ToasterContainerProps['containerId'];
  },
) => void;
```

### ToasterContainer

```typescript
type ToasterContainerProps = {
  position?: ToastPosition;
  limit?: number;
  containerId?: RtToastContainerProps['containerId'];
};
```

### ToasterBig
```typescript
enum ToasterBigStatus {
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning',
  WarningCritical = 'WarningCritical',
  WarningAlarm = 'WarningAlarm',
  Error = 'Error',
  ErrorAlarm = 'ErrorAlarm',
}

type ToasterBigAction = {
  text: string;
  onClick(e: MouseEvent<HTMLButtonElement | HTMLDivElement>, close?: () => void): void;
};

type ToasterBigProps = Partial<ToastContentProps> & {
  title: ReactNode;
  description?: string;
  status?: ToasterBigStatus;
  actions?: ToasterBigAction[];
  onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
};
```

### ToasterSmall
```typescript
enum ToasterSmallStatus {
  Success = 'Success',
  Error = 'Error',
  Neutral = 'Neutral',
  Loading = 'Loading',
}

type ToasterSmallProps = Partial<ToastContentProps> & {
  text: string;
  status?: ToasterSmallStatus;
};
```
