import { MouseEvent } from 'react';

import { Divider } from '@snack-uikit/divider';
import { Link } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import { TextLike } from '../types';
import * as S from './styled';

type LegendItem = {
  label: TextLike;
  value: TextLike;
  color?: string;
  id?: string;
};

type LegendItemProps = LegendItem & {
  size: 's' | 'm' | 'l';
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function LegendItem({ color, label, value, size, onItemClick }: LegendItemProps) {
  return (
    <S.LegendItemWrapper>
      <S.LegendItemTitle>
        {color && <S.Dot color={color} />}
        <Link onClick={onItemClick} text={String(label)} size={size} />
      </S.LegendItemTitle>
      <S.LegendValue>{value}</S.LegendValue>
    </S.LegendItemWrapper>
  );
}

type LegendProps = {
  data: Array<LegendItem>;
  typographySize: 's' | 'm' | 'l';
  legendTitle?: string;
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>, data: LegendItem) => void;
};

export function Legend({ data, legendTitle, typographySize, onItemClick }: LegendProps) {
  return (
    <S.Legend>
      {legendTitle && (
        <>
          <Typography purpose={'label'} family={'sans'} size={typographySize}>
            {legendTitle}
          </Typography>
          <S.LegendDividerWrapper>
            <Divider />
          </S.LegendDividerWrapper>
        </>
      )}
      {data.map((item, index) => (
        <div key={`legend_${item.label}_${index}`}>
          <LegendItem
            {...item}
            size={typographySize}
            onItemClick={onItemClick ? event => onItemClick(event, item) : undefined}
          />
          {index !== data.length - 1 && (
            <S.LegendDividerWrapper>
              <Divider />
            </S.LegendDividerWrapper>
          )}
        </div>
      ))}
    </S.Legend>
  );
}
