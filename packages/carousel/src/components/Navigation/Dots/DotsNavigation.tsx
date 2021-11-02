import { Dot, DotsWrap } from './styled';

export type DotsProps = {
  dotsAmount: number;
  onDotClick(value: number): void;
  currentIdx: number;
};

export function DotsNavigation({ dotsAmount, onDotClick, currentIdx }: DotsProps) {
  const dots = new Array(dotsAmount).fill('dot');
  if (dots.length < 2) return <></>;
  return (
    <DotsWrap data-test-id='carousel__dots-container'>
      {dots.map((dot, idx) => (
        <Dot
          data-test-id='carousel__dot'
          key={idx}
          onClick={() => onDotClick(idx)}
          data-active={currentIdx === idx || undefined}
        />
      ))}
    </DotsWrap>
  );
}
