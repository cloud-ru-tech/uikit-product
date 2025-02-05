import { CALCULATOR_TYPE, FetcherFnProps } from '../types';
import { DEFAULT_BACKEND_HOST, DEFAULT_HEADERS } from './constants';

const kebabRegex = /[A-Z]+(?![a-z])|[A-Z]/g;

function convertToKebab(value: string) {
  return value.replaceAll(kebabRegex, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());
}

function prepareProductType(productName: string) {
  if (!productName) throw new Error(`no productName`);

  switch (productName) {
    case 'cloudContainerKubernetes':
      return 'cloud-container-engine';
    case 'ruGpt_3':
      return 'rugpт-3'; // мб rugpt-3?
    case 'ruDallЕ':
      return 'rudall-е';

    default:
      return convertToKebab(productName);
  }
}

const CALCULATOR_PRICES_URL = '/calculator/v2/prices/';

/**
 *
 * Функция для отправки запросов на цены
 * @function helper
 */
export function getFetcherFn(backendHost: string = DEFAULT_BACKEND_HOST) {
  return async function fetcherFn({ formData, productId, calculatorType }: FetcherFnProps) {
    if (!formData) return undefined;

    const productTypeKebab = prepareProductType(productId);

    let url = backendHost + CALCULATOR_PRICES_URL + productTypeKebab;
    if (calculatorType === CALCULATOR_TYPE.Partners) url = url + '?calculator_type=partners';

    const res = await fetch(url, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: formData,
    });

    if (!res.ok) throw new Error(`fetcher`);
    const response = await res.json();
    if (!response.success) throw new Error(`fetcher - success false`);
    return response.data;
  };
}
