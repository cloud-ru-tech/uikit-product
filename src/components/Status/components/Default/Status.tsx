import { Wrapper, Dot, Content } from './styled';

export const TYPE = {
  SUCCESS: 'success',
  FAILED: 'failed',
  WARNING: 'warning',
  UNACTIVE: 'unactive',
} as const;

export interface IStatusProps {
  type?: typeof TYPE[keyof typeof TYPE];
  className?: string;
}

export const Status: React.FC<IStatusProps> = ({
  type = TYPE.SUCCESS,
  className,
  children,
}) => (
  <Wrapper className={className}>
    <Dot data-type={type} />
    {children && <Content>{children}</Content>}
  </Wrapper>
);
