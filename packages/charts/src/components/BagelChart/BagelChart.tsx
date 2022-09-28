import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import { NumberFormatter } from '@sbercloud/uikit-product-localization';
import { error, extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';
import { COLORS } from './themes';
import { getSegmentColor } from './utils';

export type BagelChartProps = WithSupportProps<{
  className: string;
  value: number;
  total: number;
  title?: React.ReactNode;
}>;

export function BagelChart({ value, total, title, className, ...rest }: BagelChartProps) {
  error(value > 9_999_999, 'Value is too long');
  error(total > 999_999_999, 'Total is too long');

  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      {title && <S.TitleWrapper>{title}</S.TitleWrapper>}

      <PieChart
        data={[{ value, color: getSegmentColor({ value, total }) }]}
        totalValue={total}
        background={`var(${COLORS.svg.segment.grey})`}
        startAngle={270}
        lineWidth={15}
        label={() => (
          <React.Fragment key='label'>
            <S.Value x={50} y={45}>
              <NumberFormatter value={value} />
            </S.Value>
            <S.Limit x={50} y={65}>
              <NumberFormatter value={total} />
            </S.Limit>
          </React.Fragment>
        )}
        labelPosition={0}
      />
    </S.Wrapper>
  );
}
