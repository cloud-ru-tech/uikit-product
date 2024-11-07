// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */
import Color from 'color';
import uPlot from 'uplot';
import { ColorMap, OTHER_COLORS } from '../../../constants/colors';

export function columnHighlightPlugin({
  className = '',
  computedColors,
}: {
  className?: string;
  computedColors: ColorMap;
}) {
  const backgroundColor = new Color(computedColors[OTHER_COLORS.ColumnHighlightColor]).alpha(0.5).rgb().string();

  let underEl, overEl, currIdx: number;

  function init(u: uPlot) {
    underEl = u.under;
    overEl = u.over;

    const highlightEl = document.createElement('div');

    className && highlightEl.classList.add(className);

    uPlot.assign(highlightEl.style, {
      pointerEvents: 'none',
      display: 'none',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      backgroundColor,
    });

    underEl.appendChild(highlightEl);

    u._highlightEl = highlightEl;

    // show/hide highlight on enter/exit
    overEl.addEventListener('mouseenter', () => {
      highlightEl.style.display = null;
    });
    overEl.addEventListener('mouseleave', () => {
      highlightEl.style.display = 'none';
    });
  }

  function update(u) {
    if (currIdx !== u.cursor.idx) {
      currIdx = u.cursor.idx;
      const highlightEl = u._highlightEl;

      const dx = u.scales.x.max - u.scales.x.min;
      const width = u.bbox.width / dx / devicePixelRatio;
      const left = u.valToPos(currIdx, 'x') - width / 2;

      highlightEl.style.transform = 'translateX(' + Math.round(left) + 'px)';
      highlightEl.style.width = Math.round(width) + 'px';
    }
  }

  return {
    opts: (u, opts) => {
      uPlot.assign(opts, {
        cursor: {
          x: false,
          y: false,
        },
      });
    },
    hooks: {
      init: init,
      setCursor: update,
    },
  };
}
