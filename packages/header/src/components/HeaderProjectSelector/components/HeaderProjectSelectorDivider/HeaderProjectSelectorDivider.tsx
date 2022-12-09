import { Divider } from '@sbercloud/uikit-product-divider';

export type HeaderProjectSelectorDividerProps = {
  className?: string;
};

export function HeaderProjectSelectorDivider({ className }: HeaderProjectSelectorDividerProps) {
  return <Divider variant={Divider.variants.Secondary} className={className} />;
}
