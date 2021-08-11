import { HeaderContainerStyled } from './styled';

export interface IHeaderProps {
  text: string | React.ReactNode;
}

export const Header: React.FC<IHeaderProps> = ({ text }) => (
  <HeaderContainerStyled data-test-id='drawer__header-title'>{text}</HeaderContainerStyled>
);
