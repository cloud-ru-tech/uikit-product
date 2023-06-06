import { HeaderContainerStyled } from './styled';

export type IHeaderProps = {
  text: string | React.ReactNode;
};

export function Header({ text }: IHeaderProps) {
  return <HeaderContainerStyled data-test-id='drawer__header-title'>{text}</HeaderContainerStyled>;
}
