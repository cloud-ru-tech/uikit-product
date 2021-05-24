import * as S from './styled';

export const ActionButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = props => <S.Button type='button' {...props} />;
