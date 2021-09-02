import fileDownload from 'js-file-download';

export function downloadFile(data: string | ArrayBuffer | ArrayBufferView | Blob, filename: string) {
  fileDownload(data, filename);
}
