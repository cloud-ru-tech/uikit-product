import { State } from '@sbercloud/uikit-product-calculator';

export function getOnDownloadFileClick(backendHost: string = 'https://api.cloud.ru') {
  return async function onDownloadFileClick(state: State) {
    const urlBe = `${backendHost}/calculator-result/v2/excel`;

    const res = await fetch(urlBe, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(state),
    });

    if (!res.ok) throw new Error(`fetcher`);

    const blob = await res.blob();

    const a = document.createElement('a');
    document.body.appendChild(a);

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Расчет_стоимости_CloudRu.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };
}
