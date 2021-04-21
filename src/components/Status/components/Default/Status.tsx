import { Wrapper, Dot, Content } from './styled';

export const TYPE = {
  SUCCESS: 'success',
  FAILED: 'failed',
  WARNING: 'warning',
  UNACTIVE: 'unactive',
} as const;

export interface IStatusProps {
  type?: typeof TYPE[keyof typeof TYPE];
  dotColor?: string;
  className?: string;
}

export const Status: React.FC<IStatusProps> = ({
  type = TYPE.SUCCESS,
  className,
  dotColor,
  children,
}) => (
  <Wrapper className={className}>
    <Dot data-type={dotColor ? undefined : type} color={dotColor} />
    {children && <Content>{children}</Content>}
  </Wrapper>
);
