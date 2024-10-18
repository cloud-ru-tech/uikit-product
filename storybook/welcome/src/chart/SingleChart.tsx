import { styled } from '@linaria/react';
import { PieChart } from 'react-minimal-pie-chart';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { PURPLE } = EXPORT_VARS;

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import * as S from '../styles';
import { SingleChartProps } from '../types';

const Title = styled.h3`
  ${themeVars.sans.title.m};

  margin-bottom: 60px;
`;

export function SingleChart(props: SingleChartProps) {
  return (
    <S.Wrapper height={props.height}>
      <Title>{props.title}</Title>
      <PieChart
        data={[{ value: props.value, color: `var(${PURPLE[100]})` }]}
        totalValue={props.total}
        lineWidth={20}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: '25px',
          fontFamily: 'sans-serif',
          fill: `var(${PURPLE[100]})`,
        }}
        labelPosition={0}
      />
    </S.Wrapper>
  );
}
