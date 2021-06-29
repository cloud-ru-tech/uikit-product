# React Attention

## Installation
`npm i @sbercloud/uikit-react-attention`

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


