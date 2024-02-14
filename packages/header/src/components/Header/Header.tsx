import { ProductHeader, ProductHeaderProps } from '../ProductHeader';
import { ProductHeaderMobile } from '../ProductHeaderMobile';

export type HeaderProps = { mobile?: boolean } & ProductHeaderProps;

export function Header({ mobile, ...props }: HeaderProps) {
  if (mobile) {
    return <ProductHeaderMobile {...props} />;
  }

  return <ProductHeader {...props} />;
}
