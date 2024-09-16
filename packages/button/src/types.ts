import { ComponentPropsWithRef, ElementType, PropsWithRef } from 'react';

type Merge<T, U> = Omit<T, keyof U> & U;

type PropsWithAs<P, T extends ElementType> = P & { as?: T };

export type PolymorphicPropsWithRef<P, T extends ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements ? PropsWithRef<JSX.IntrinsicElements[T]> : ComponentPropsWithRef<T>,
  PropsWithAs<P, T>
>;
