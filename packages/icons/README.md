# React Icons
`@sbercloud/icons` is no longer needed (**deprecated**). 

## Installation

`npm i @sbercloud/uikit-react-icons`

## Components interface 
```typescript
interface ISvgIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  wrapperSize?: string | number;
  size?: string | number;
  wrapperClasses?: string;
  style?: React.CSSProperties;
}
```