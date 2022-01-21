# Utils

## Installation
`npm i @sbercloud/uikit-utils`

### Config provider

If component is mounted, then it extends html tag by current lang and current themes data-attributes, adds classes with colors to body. Controls for changing are enabled via `useTheme` and `useLanguage` hooks. 

### Dev utils

#### CreateTextProvider
creates text provider

```typescript jsx
import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-utils';

enum Texts = {
  Hide = 'Hide',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Hide]: 'Скрыть',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Hide]: 'Hide',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'package-name');
```

#### ExtractSupportProps

return props matched to `/^(data-test|aria)-/` regexp

```typescript jsx
import { extractSupportProps } from '@sbercloud/uikit-utils';

const sampleProps = {
  ['data-test-id']: '1',
  ['aria-disabled']: true, 
  ['data-disabled']: false,
  onClick: () => {},
  value: '123'
}

extractSupportProps(sampleProps) => {
  ['data-test-id']: '1', 
  ['aria-disabled']: true
}   
```

#### ExtractDataTestProps

return props matched to `/^data-test-/` regexp

```typescript jsx
import { extractDataTestProps } from '@sbercloud/uikit-utils';

const sampleProps = {
  ['data-test-id']: '1',
  ['aria-disabled']: true,
  ['data-disabled']: false,
  onClick: () => {},
  value: '123'
}

extractDataTestProps(sampleProps) => {
  ['data-test-id']: '1'
}   
```

#### ExcludeSupportProps

return props not matched to `/^(data-test|aria)-/` regexp

```typescript jsx
import { excludeSupportProps } from '@sbercloud/uikit-utils';

const sampleProps = {
  ['data-test-id']: '1',
  ['aria-disabled']: true, 
  ['data-disabled']: false,
  onClick: () => {},
  value: '123'
}

excludeSupportProps(sampleProps) => {
  ['data-disabled']: false,
  onClick: () => {},
  value: '123'
}   
```

### Hooks

#### useLanguage

Require Config Provider to be mounted

```typescript jsx
import { useLanguage } from '@sbercloud/uikit-utils';

function Component() {
  const { languageCode, changeLanguage } = useLanguage();
}
```

#### useTheme

Require Config Provider to be mounted

```typescript jsx
import { useTheme } from '@sbercloud/uikit-utils';

function Component() {
  const { theme, changeTheme } = useTheme();
}
```
