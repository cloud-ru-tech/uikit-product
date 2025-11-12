import { copyToClipboard } from '@cloud-ru/ft-copy-to-clipboard';

import { State } from '../types';
import { DEFAULT_BACKEND_HOST, DEFAULT_BASE_URL, DEFAULT_HEADERS } from './constants';

const CALCULATOR_SHARE_SAVE_URL = '/calculator-share/v2/save';

/**
 *
 * Функция для получения ссылки на расчет
 * @function helper
 */
function getShareSaveService(backendHost: string) {
  return async function shareSaveService(state: State) {
    const totalUrl = backendHost + CALCULATOR_SHARE_SAVE_URL;

    const body = {
      calculatorType: state.calculatorType,
      products: state.products,
    };
    const params = {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    };

    const res = await fetch(totalUrl, params);

    if (!res.ok) throw new Error(`fetcher`);
    const response = await res.json();
    if (!response.data) throw new Error(`fetcher`);

    return response.data;
  };
}

type GetOnShareClickProps = {
  /** @default 'https://api.cloud.ru' */
  backendHost?: string;
  /** @default 'https://cloud.ru' */
  baseUrl?: string;
};

export function getOnShareClick(props: GetOnShareClickProps = {}) {
  const { backendHost = DEFAULT_BACKEND_HOST, baseUrl = DEFAULT_BASE_URL } = props;

  const shareSaveService = getShareSaveService(backendHost);

  return async function onShareClick(state: State) {
    return shareSaveService(state).then(({ Hash: hash }) => {
      const shareLink = `${baseUrl}/calculator?hash=${hash}`;

      shareLink && copyToClipboard(shareLink);
    });
  };
}
