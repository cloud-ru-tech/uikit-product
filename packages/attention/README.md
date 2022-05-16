# React Attention

## Installation
`npm i @sbercloud/uikit-product-attention`

## Components interface
```typescript
enum ImportanceLevels {
    Normal = 'normal',
    High = 'high',
}

type AttentionProps = { 
    children: React.ReactNode; 
    importanceLevel?: ImportanceLevels 
};
```

[Changelog](./CHANGELOG.md)


