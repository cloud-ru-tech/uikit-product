import { HeaderContainerStyled } from './styled';

export interface IHeaderProps {
  text: string | React.ReactNode;
}

export const Header: React.FC<IHeaderProps> = ({ text }) => <HeaderContainerStyled>{text}</HeaderContainerStyled>;
