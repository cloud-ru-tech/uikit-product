# React Radio

## Installation
`npm i @sbercloud/uikit-react-radio`

## Props 
```typescript
type RadioProps = {
  value: React.ReactText;
  label?: string;
  disabled?: boolean;
  className?: string;
};

type RadioGroupProps = {
  value?: React.ReactText;
  onChange: (value: React.ReactText) => void;
  children: React.ReactNode;
};
```


