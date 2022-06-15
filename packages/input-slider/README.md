# Input Slider

## Installation
`npm i @sbercloud/uikit-product-input-slider`

## Props

```typescript
type InputSliderBaseProps = WithSupportProps<{
    className?: string;
    disabled?: boolean;
    hint?: string;
    postfix?: string;
    label?: string;
    labelTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
    marks: number[];
    max: number;
    min: number;
    optional?: boolean;
    step?: number;
}>;

type InputSliderCommonProps = InputSliderBaseProps & {
    value: number;
    onChange: (value: number) => void;
};

type InputSliderRangeProps = InputSliderBaseProps & {
    value: [number, number];
    onChange: (value: [number, number]) => void;
};
```


