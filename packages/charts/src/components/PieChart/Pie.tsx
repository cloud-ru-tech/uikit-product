import { arc, pie, PieArcDatum } from 'd3-shape';
import { CSSProperties, Fragment, MouseEvent } from 'react';

import { ColorizedDataType, DataType, LabelRenderFunction } from './types';

type PieProps = {
  data: ColorizedDataType[];
  label: LabelRenderFunction<DataType>;
  onMouseOut: () => void;
  onMouseOver: (event: MouseEvent<SVGPathElement>, dataIndex: number) => void;
  onMouseDown: (event: MouseEvent<SVGPathElement>, dataIndex: number) => void;
  radius: number;
  innerRadius: number;
  segmentsShift: number;
  segmentsStyle: CSSProperties;
  hoveredIndex?: number;
  style: CSSProperties;
};

export function Pie({
  data,
  hoveredIndex,
  radius,
  innerRadius,
  segmentsShift,
  onMouseOut,
  label,
  style,
  segmentsStyle,
  onMouseOver,
  onMouseDown,
}: PieProps) {
  const pieSegments = pie<ColorizedDataType>()
    .sort(null)
    .value((d: ColorizedDataType) => d.value)(data);

  const getHoveredPath = arc<PieArcDatum<ColorizedDataType>>()
    .outerRadius(radius + 1)
    .innerRadius(innerRadius + 1)
    .startAngle(d => d.startAngle + Math.PI / 2)
    .endAngle(d => d.endAngle + Math.PI / 2)
    .padAngle(segmentsShift);

  const getPath = arc<PieArcDatum<ColorizedDataType>>()
    .outerRadius(radius)
    .innerRadius(innerRadius)
    .startAngle(d => d.startAngle + Math.PI / 2)
    .endAngle(d => d.endAngle + Math.PI / 2)
    .padAngle(segmentsShift);

  return (
    <svg viewBox='0 0 100 100' width='100%' height='100%' style={style}>
      <g transform='translate(50,50)'>
        {pieSegments.map((segment, index) => (
          <Fragment key={index}>
            <path
              onMouseOver={e => onMouseOver(e, index)}
              onMouseOut={onMouseOut}
              onMouseDown={e => onMouseDown(e, index)}
              fill={segment.data.color}
              d={hoveredIndex === index ? String(getHoveredPath(segment)) : String(getPath(segment))}
              style={segmentsStyle}
            />

            {label({ dataEntry: segment.data, dataIndex: index })}
          </Fragment>
        ))}
      </g>
    </svg>
  );
}
