import { ReactText } from 'react';

import * as S from './styled';

function LegendItem({ color, label, value }: { color?: string; label: ReactText; value: ReactText }) {
  return (
    <S.LegendItemWrapper>
      <S.LegendItemTitle>
        {color && <S.Dot color={color} />}
        <span>{label}</span>
      </S.LegendItemTitle>
      <S.LegendValue>{value}</S.LegendValue>
    </S.LegendItemWrapper>
  );
}

export function Legend({
  data,
  legendTitle,
}: {
  data: Array<{ label: ReactText; value: ReactText; color?: string }>;
  legendTitle?: string;
}) {
  return (
    <S.Legend>
      {legendTitle && (
        <>
          <div>{legendTitle}</div>
          <S.LegendDivider />
        </>
      )}
      {data.map((x, index) => (
        <div key={`legend_${x.label}_${index}`}>
          <LegendItem {...x} />
          {index !== data.length - 1 && <S.LegendDivider />}
        </div>
      ))}
    </S.Legend>
  );
}
