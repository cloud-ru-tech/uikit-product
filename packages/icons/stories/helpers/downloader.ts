import { downloadFile } from '@sbercloud/ft-download-file';

const download = (canvas: HTMLCanvasElement, fileName: string) => {
  const path = canvas.toDataURL('image/png');
  downloadFile({ path, fileName });
};

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
  const url = DOMURL.createObjectURL(svgBlob);

  image.src = url;
  try {
    canvas.width = Number(svg.style.width.slice(0, -2)) | 50;
    canvas.height = Number(svg.style.height.slice(0, -2)) | 50;
  } catch (error) {
    canvas.width = 50;
    canvas.height = 50;
  }

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
