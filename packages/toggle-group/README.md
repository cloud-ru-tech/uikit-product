# React Toggle Group

## Installation

`npm i @sbercloud/uikit-product-toggle-group`

## Usage

```tsx
import { useState } from 'react';

import { ToggleCard, ToggleGroup } from '@sbercloud/uikit-product-toggle-group';

function App() {
  const [value, setValue] = useState<number[]>();

  return (
    <ToggleGroup mode={ToggleGroup.mode.Checkbox} value={value} onChange={setValue}>
      <ToggleCard
        value={1}
        title='Базовые образы'
        description='Готовые Docker-образы с популярными инструментами для обучения и инференса'
      />
      <ToggleCard value={2} title='Модели' description='Доступные для дообучения и инференса' />
      <ToggleCard value={3} title='Контейнеры' description='С популярными библиотеками и инструментами' />
    </ToggleGroup>
  );
}
```

## Props

### Declarations

```ts
type Value = string | number;

enum Orientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

enum Mode {
  Checkbox = 'checkbox',
  Radio = 'radio',
}
```

### ToggleGroup

```ts
type ToggleGroupProps<T extends Value = Value> = WithSupportProps<{
  children: ReactNode;
  mode: Mode;
  onChange: (value: T[]) => void;
  value?: T[];
  orientation?: Orientation;
  gap?: number;
  breakpoint?: number;
  className?: string;
}>;
```

### ToggleCard

```ts
enum Alignment {
  Start = 'start',
  Center = 'center',
}

type ToggleCardProps = WithSupportProps<{
  value: Value;
  title: string;
  icon?: ReactElement | boolean | null;
  description?: string;
  className?: string;
  disabled?: boolean;
  alignment?: Alignment;
}>;
```

### ToggleCardDisplay

```ts
type ToggleCardDisplayProps = WithSupportProps<{
  value: Value;
  title: string;
  icon: ReactElement<{ size?: string | number }>;
  className?: string;
  disabled?: boolean;
}>;
```

### ToggleCardDisplayExtra

```ts
type ToggleCardDisplayExtraProps = WithSupportProps<{
  value: Value;
  title: string;
  icon: ReactElement<{ size?: string | number }>;
  description: string;
  caption: string;
  className?: string;
  disabled?: boolean;
}>;
```

### ToggleCardDisplayLogo

```ts
type ToggleCardDisplayLogoProps = WithSupportProps<{
  value: Value;
  title: string;
  icon: ReactElement<{ size?: string | number }>;
  caption: string;
  className?: string;
  disabled?: boolean;
}>;
```

### ToggleCardExtended

```ts
type ToggleCardExtendedProps = WithSupportProps<{
  value: Value;
  title: string;
  displayedValue: string;
  description: string;
  label: string;
  className?: string;
  disabled?: boolean;
}>;
```
