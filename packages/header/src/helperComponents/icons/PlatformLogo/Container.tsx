import { JSXElementConstructor, PropsWithChildren } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import styled from './styles.modules.scss';

export type ContainerProps = PropsWithChildren<
  WithSupportProps<{
    className?: string;
  }>
>;

export function Container({ children, ...otherProps }: ContainerProps) {
  return (
    <div className={styled.container} {...otherProps}>
      {children}
    </div>
  );
}

export type IconComponentProps = {
  className?: string;
};

export const getPlatformIconComponent = (Icon: JSXElementConstructor<{ size: number }>) =>
  function IconComponent(props: IconComponentProps) {
    return (
      <Container {...props}>
        <Icon size={24} />
      </Container>
    );
  };
