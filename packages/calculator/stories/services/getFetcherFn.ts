import { FetcherFnProps } from '@sbercloud/uikit-product-calculator';

function productNameToKebab(productName: string) {
  if (!productName) throw new Error(`no productName`);
  if (productName === 'cloudContainerKubernetes') return 'cloud-container-engine';
  if (productName === 'ruGpt_3') return 'rugpт-3';
  if (productName === 'ruDallЕ') return 'rudall-е';
  //
  const regex = /[A-Z]+(?![a-z])|[A-Z]/g;
  const productNameKebab = productName.replaceAll(regex, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());
  return productNameKebab;
}

export async function fetcherFn({ formData, productId, calculatorType }: FetcherFnProps) {
  if (!formData) return undefined;

  const productTypeKebab = productNameToKebab(productId);

  const beUrlV2 = '/calculator/v2/prices/';
  let url = 'https://api.cloud.ru' + beUrlV2 + productTypeKebab;
  if (calculatorType === 'partners') url = url + '?calculator_type=partners';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: formData,
  });
  if (!res.ok) throw new Error(`fetcher`);
  const responce = await res.json();
  if (!responce.success) throw new Error(`fetcher - success false`);
  return responce.data;
}

export function getFetcherFn(backendHost: string = 'https://api.cloud.ru') {
  return async function fetcherFn({ formData, productId, calculatorType }: FetcherFnProps) {
    if (!formData) return undefined;

    const productTypeKebab = productNameToKebab(productId);

    const beUrlV2 = '/calculator/v2/prices/';
    let url = backendHost + beUrlV2 + productTypeKebab;
    if (calculatorType === 'partners') url = url + '?calculator_type=partners';

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: formData,
    });
    if (!res.ok) throw new Error(`fetcher`);
    const responce = await res.json();
    if (!responce.success) throw new Error(`fetcher - success false`);
    return responce.data;
  };
}
