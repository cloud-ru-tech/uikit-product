import { copyToClipboard } from '@sbercloud/ft-copy-to-clipboard';
import { State } from '@sbercloud/uikit-product-calculator';

function getShareSaveService(backendHost: string) {
  return async function shareSaveService(state: State) {
    const shareCalculatorUrl = '/calculator-share/v2/save';
    const totalUrl = backendHost + shareCalculatorUrl;

    const body = {
      calculatorType: state.calculatorType,
      products: state.products,
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
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
  const { backendHost = 'https://api.cloud.ru', baseUrl = 'https://cloud.ru' } = props;

  const shareSaveService = getShareSaveService(backendHost);

  return async function onShareClick(state: State) {
    return shareSaveService(state).then(({ Hash: hash }) => {
      const shareLink = `${baseUrl}/calculator?hash=${hash}`;

      shareLink && copyToClipboard(shareLink);
    });
  };
}
