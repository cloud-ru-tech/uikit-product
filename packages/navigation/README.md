# Navigation

## Installation

`npm i @sbercloud/uikit-product-navigation`

## Usage

```tsx
import { HeaderBalanceTooltip } from '@sbercloud/uikit-product-navigation';

function App() {
  function handleBalanceClick() {}

  function handleRechargeClick() {}

  return (
    <HeaderBalanceTooltip
      balance={144_401_810}
      limit={155_500_000}
      onBalanceClick={handleBalanceClick}
      onRechargeClick={handleRechargeClick}
    />
  );
}
```

## Props

### HeaderBalanceTooltip

```ts
type HeaderBalanceTooltipProps = WithSupportProps<{
  balance?: number;
  limit?: number;
  className?: string;
  onBalanceClick?: () => void;
  onRechargeClick?: () => void;
}>;
```
