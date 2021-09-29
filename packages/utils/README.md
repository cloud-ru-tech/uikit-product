# Utils

## Installation
`npm i @sbercloud/uikit-utils`

### Config provider

If component is mounted, then it extends html tag by current lang and current themes data-attributes, adds classes with colors to body. Controls for changing are enabled via `useTheme` and `useLanguage` hooks. 

### Dev utils

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

extractSupportProps(sampleProps) => 
    {
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

extractDataTestProps(sampleProps) => 
    {
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

excludeSupportProps(sampleProps) => 
    {
        ['data-disabled']: false,
        onClick: () => {},
        value: '123'
    }   
```

#### TruncateString

```typescript jsx
import { truncateString } from '@sbercloud/uikit-utils';

truncateString('123'.repeat(100), 9) => '123123...'
```

### Function utils

#### CopyToClipBoard

```typescript jsx
import { copyToClipboard } from '@sbercloud/uikit-utils';

<button onClick={() => copyToClipboard("Text to copy")} />
```

#### DownloadFile

```typescript jsx
import { downloadFile } from '@sbercloud/uikit-utils';

<button onClick={() => downloadFile("Content to be put into downloadable file", "downloadable.txt")} />
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
