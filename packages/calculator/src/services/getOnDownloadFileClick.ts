/* eslint-disable @cloud-ru/ssr-safe-react/domApi */
import { State } from '../types';
import { DEFAULT_BACKEND_HOST, DEFAULT_HEADERS } from './constants';

const DOWNLOADED_FILENAME = 'Расчет_стоимости_CloudRu.xlsx';
const CALCULATOR_RESULT_EXCEL_URL = '/calculator-result/v2/excel';

/**
 *
 * Функция для выгрузки расчета по ценам
 * @function helper
 */
export function getOnDownloadFileClick(backendHost: string = DEFAULT_BACKEND_HOST) {
  return async function onDownloadFileClick(state: State) {
    const urlBe = backendHost + CALCULATOR_RESULT_EXCEL_URL;

    const res = await fetch(urlBe, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(state),
    });

    if (!res.ok) throw new Error(`fetcher`);

    const blob = await res.blob();

    const a = document.createElement('a');
    document.body.appendChild(a);

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = DOWNLOADED_FILENAME;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };
}
