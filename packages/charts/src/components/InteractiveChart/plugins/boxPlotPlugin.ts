// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */
import uPlot from 'uplot';

import { CHART_COLORS, Colors } from '../../../constants/colors';

export function boxPlotPlugin({ gap = 5, shadowColor = '#63696E', bodyMaxWidth = 60, shadowWidth = 3 } = {}) {
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y - radius);
    ctx.lineTo(x + width, y + height + radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height + radius);
    ctx.lineTo(x, y - radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  function drawBoxes(u) {
    u.ctx.save();

    const offset = (shadowWidth % 2) / 2;

    u.ctx.translate(offset, offset);

    const [iMin, iMax] = u.series[0].idxs;

    for (let i = iMin; i <= iMax; i++) {
      const xVal = u.scales.x.distr === 2 ? i : u.data[0][i];
      const open = u.data[1][i];
      const low = u.data[2][i];
      const median = u.data[3][i];
      const high = u.data[4][i];
      const close = u.data[5][i];

      const timeAsX = u.valToPos(xVal, 'x', true);
      const openAsY = u.valToPos(open, 'y', true);
      const lowAsY = u.valToPos(low, 'y', true);
      const medianAsY = u.valToPos(median, 'y', true);
      const highAsY = u.valToPos(high, 'y', true);
      const closeAsY = u.valToPos(close, 'y', true);

      // moustache
      const shadowHeight = closeAsY - openAsY;
      const shadowX = timeAsX - shadowWidth / 2;
      const shadowY = openAsY;
      const columnWidth = u.bbox.width / (iMax - iMin + 2);
      const bodyWidth = Math.min(bodyMaxWidth, columnWidth - gap);

      u.ctx.fillStyle = shadowColor;
      u.ctx.fillRect(Math.round(shadowX), Math.round(shadowY), Math.round(shadowWidth), Math.round(shadowHeight));
      u.ctx.fillRect(
        Math.round(timeAsX - bodyWidth / 4),
        Math.round(shadowY - shadowWidth / 2),
        Math.round(bodyWidth / 2),
        Math.round(shadowWidth),
      );
      u.ctx.fillRect(
        Math.round(timeAsX - bodyWidth / 4),
        Math.round(shadowY + shadowHeight - shadowWidth / 2),
        Math.round(bodyWidth / 2),
        Math.round(shadowWidth),
      );

      // body rect
      const bodyHeight = highAsY - lowAsY;
      const bodyX = timeAsX - bodyWidth / 2;
      const bodyY = lowAsY;

      if (Math.abs(bodyHeight) > 8) {
        u.ctx.fillStyle = CHART_COLORS[Object.values(Colors)[i % Object.keys(Colors).length]].stroke;
        roundRect(
          u.ctx,
          Math.round(bodyX),
          Math.round(bodyY),
          Math.round(bodyWidth),
          Math.round(bodyHeight),
          8,
          true,
          true,
        );

        u.ctx.fillStyle = 'rgba(255,255,255,0.48)';
        u.ctx.fillRect(Math.round(bodyX), medianAsY - shadowWidth / 2, Math.round(bodyWidth), Math.round(shadowWidth));
      }
    }

    u.ctx.translate(-offset, -offset);

    u.ctx.restore();
  }

  return {
    opts: (u, opts) => {
      uPlot.assign(opts, {
        cursor: {
          points: {
            show: false,
          },
        },
      });

      opts.series.forEach(series => {
        series.paths = () => null;
        series.points = { show: false };
      });
    },
    hooks: {
      draw: drawBoxes,
    },
  };
}
