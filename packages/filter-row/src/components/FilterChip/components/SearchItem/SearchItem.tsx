import { Divider } from '../Divider';
import * as S from './styled';

type SearchItemProps = {
  value: string;
  onChange(value: string): void;
};

export function SearchItem({ value, onChange }: SearchItemProps) {
  return (
    <S.SearchItemContainer>
      <S.Search value={value} onChange={onChange} />
      <Divider />
    </S.SearchItemContainer>
  );
}
