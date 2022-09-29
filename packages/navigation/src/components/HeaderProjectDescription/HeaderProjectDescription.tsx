import { TruncatedTextWithTooltip } from '../../helperComponents';
import * as S from './styled';

export type HeaderProjectDescriptionProps = {
  label: string;
};

export function HeaderProjectDescription({ label }: HeaderProjectDescriptionProps) {
  return (
    <S.Description data-test-id='header-project-description'>
      <S.Text placement={TruncatedTextWithTooltip.placements.Bottom}>{label}</S.Text>
    </S.Description>
  );
}
