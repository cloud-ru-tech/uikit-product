// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import uPlot from 'uplot';

export function legendAsTooltipPlugin({ className = '', style = { backgroundColor: '#373E45', color: '#fff' } } = {}) {
  let legendEl;

  function init(u: uPlot, opts) {
    legendEl = u.root.querySelector('.u-legend') as Element;

    legendEl.classList.remove('u-inline');
    className && legendEl.classList.add(className);

    uPlot.assign(legendEl.style, {
      borderRadius: '4px',
      textAlign: 'left',
      pointerEvents: 'none',
      display: 'none',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 100,
      ...style,
    });

    // hide series color markers
    const idents = legendEl.querySelectorAll('.u-marker');

    for (let i = 0; i < idents.length; i++) idents[i].style.display = 'none';

    const overEl = u.over;
    overEl.style.overflow = 'visible';

    // move legend into plot bounds
    overEl.appendChild(legendEl);

    // show/hide tooltip on enter/exit
    overEl.addEventListener('mouseenter', () => {
      legendEl.style.display = null;
    });
    overEl.addEventListener('mouseleave', () => {
      legendEl.style.display = 'none';
    });
  }

  function update(u) {
    const { left, top } = u.cursor;
    legendEl.style.transform = 'translate(' + (left + 15) + 'px, ' + top + 'px)';
  }

  return {
    hooks: {
      init: init,
      setCursor: update,
    },
  };
}
