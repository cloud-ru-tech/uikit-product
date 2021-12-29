import * as S from './styled';

type FooterProps = {
  error?: string;
  hint?: string;
  length?: {
    current: number;
    max: number;
  };
};

export function Footer({ error, length, hint }: FooterProps) {
  const isReverseContainer = (error ? !error : !hint) && length;
  return (
    <S.FlexWrapper data-reverse={isReverseContainer || undefined}>
      {error && (
        <S.ErrorWrapper>
          <S.ErrorIcon size={16} />
          <S.ErrorText data-test-id={'input-wrapper__error-reason'}>{error}</S.ErrorText>
        </S.ErrorWrapper>
      )}
      {!error && hint && <S.HintText data-test-id={'input-wrapper__hint'}>{hint}</S.HintText>}
      {length && (
        <S.LengthCounter data-test-id={'input-wrapper__length-counter'}>
          {length.current}/{length.max}
        </S.LengthCounter>
      )}
    </S.FlexWrapper>
  );
}
