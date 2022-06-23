import { styled } from '@linaria/react';
import { PieChart } from 'react-minimal-pie-chart';

import { H3_STYLES } from '@sbercloud/uikit-product-typography';

import { getRandomColor } from '../helper';
import * as S from '../styles';
import { SingleChartProps } from '../types';

const Title = styled.h3`
  ${H3_STYLES};
  margin-bottom: 60px;
`;

export const SingleChart = (props: SingleChartProps) => {
  return (
    <S.Wrapper height={props.height}>
      <Title>{props.title}</Title>
      <PieChart
        data={[{ value: props.value, color: getRandomColor() }]}
        totalValue={props.total}
        lineWidth={20}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: '25px',
          fontFamily: 'sans-serif',
          fill: getRandomColor(),
        }}
        labelPosition={0}
      />
    </S.Wrapper>
  );
};
