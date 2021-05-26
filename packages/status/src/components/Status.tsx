import { Content, Dot, Wrapper } from './styled';

export enum Types {
  Success = 'success',
  Failed = 'failed',
  Warning = 'warning',
  Unactive = 'unactive',
}

export type StatusProps = {
  type?: Types;
  dotColor?: string;
  className?: string;
  children: React.ReactNode;
};

export function Status({ type = Types.Success, className, dotColor, children }: StatusProps) {
  return (
    <Wrapper className={className}>
      <Dot data-type={dotColor ? undefined : type} color={dotColor} />
      {children && <Content>{children}</Content>}
    </Wrapper>
  );
}

Status.types = Types;
