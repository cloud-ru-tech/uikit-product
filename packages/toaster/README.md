# React Toaster

## Installation
`npm i @sbercloud/uikit-react-toaster`

[Changelog](./CHANGELOG.md)

## Usage
### You only need a hook to use a toaster, see available props in types

```typescript
const { openToast, types } = useToast();

const onClick = () => {
  openToast({
    type: types.Big,
    toastProps: {/* toastProps */ },
    containerProps: {/* containerProps if needed */ },
    toastOptions: {/* toastOptions if needed */ },
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

type ToastProps = ToasterBigProps | ToasterSmallProps;

enum ToastType {
  Big = 'Big',
  Small = 'Small',
}

type OpenToast = (args: {
  type: ToastType;
  toastProps: ToastProps;
  containerProps?: ToasterContainerProps;
  toastOptions?: ToastOptions;
}) => Promise<ReactText | undefined>;
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
