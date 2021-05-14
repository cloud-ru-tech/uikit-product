import { IconButton, IconButtonProps } from './IconButton';
import { Variants } from './types';
import { TextIconButton, TextIconButtonProps } from './TextIconButton';

export type TableButtonProps = {
  variant: Variants;
} & (TextIconButtonProps | IconButtonProps);

export function TableButton({ variant, ...rest }: TableButtonProps) {
  switch (variant) {
    case Variants.TextIcon:
      return <TextIconButton {...((rest as unknown) as TextIconButtonProps)} />;
    case Variants.Icon:
      return <IconButton {...((rest as unknown) as IconButtonProps)} />;
    case Variants.Menu:
      throw new Error('Not implemented');
    default:
      return null;
  }
}

TableButton.variants = Variants;
