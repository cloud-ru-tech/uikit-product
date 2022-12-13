import { Divider as DividerInner } from '@sbercloud/uikit-product-divider';

export type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return <DividerInner variant={DividerInner.variants.Secondary} className={className} />;
}
