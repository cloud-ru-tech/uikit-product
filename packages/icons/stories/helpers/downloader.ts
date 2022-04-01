import { downloadFile } from '@sbercloud/ft-download-file';

const DEFAULT_SVG_SIZE = 20;

const download = (canvas: HTMLCanvasElement, fileName: string) => {
  const path = canvas.toDataURL('image/png');
  downloadFile({ path, fileName });
};

const getSvgSize = (size?: string) => (size ? Number(size.slice(0, -2)) : DEFAULT_SVG_SIZE);

export async function svgExport({ id, fileName }: { id: string; fileName: string }) {
  const svg = document.getElementById(id);

  if (!svg) {
    return console.error('Element missing from page');
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const data = new XMLSerializer().serializeToString(svg);

  const DOMURL = window.URL || window.webkitURL || window;
  const image = new Image();

  const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });

  image.src = DOMURL.createObjectURL(svgBlob);

  canvas.width = getSvgSize(svg.style.width);
  canvas.height = getSvgSize(svg.style.height);

  if (image.complete) {
    context?.drawImage(image, 0, 0);
    download(canvas, fileName);
  } else {
    image.onload = function () {
      context?.drawImage(image, 0, 0);
      download(canvas, fileName);
    };
  }
}
