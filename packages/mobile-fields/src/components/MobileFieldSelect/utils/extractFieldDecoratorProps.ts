import { FieldDecoratorProps } from '@snack-uikit/fields';

export function extractFieldDecoratorProps({
  error,
  required,
  readonly,
  label,
  labelTooltip,
  labelTooltipPlacement,
  labelFor,
  caption,
  hint,
  disabled,
  showHintIcon,
  size,
  validationState,
  className,
}: Partial<FieldDecoratorProps>): Partial<FieldDecoratorProps> {
  return {
    error,
    required,
    readonly,
    label,
    labelTooltip,
    labelTooltipPlacement,
    labelFor,
    caption,
    hint,
    disabled,
    showHintIcon,
    size,
    validationState,
    className,
  };
}
