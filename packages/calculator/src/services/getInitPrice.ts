import { CALCULATOR_TYPE, FetcherFn, FormValues, Price, ProductState } from '../types';

/**
 *
 * Функция для получения стартовой цены
 * @function helper
 */
export async function getInitPrice(products: Record<string, Partial<ProductState>[] | null>, fetcherFn: FetcherFn) {
  const productsWithData = Object.entries(products).filter(([, items]) => items && items?.length > 0) as [
    string,
    ProductState[],
  ][];

  const productPrices = (await Promise.all(
    productsWithData.map(async ([id, items]) => {
      const priceItems = await Promise.all(
        items.map(async ({ data }) => {
          const state: { price?: Price; priceList?: FormValues; data?: FormValues } = {};

          try {
            const res = (await fetcherFn({
              formData: JSON.stringify(data),
              productId: id,
              calculatorType: CALCULATOR_TYPE.Main,
            })) as
              | {
                  price: Price;
                  priceList?: FormValues;
                  values?: FormValues;
                }
              | undefined;

            if (res?.price) state.price = res?.price;
            if (res?.priceList) state.priceList = res.priceList;
            if (res?.values) state.data = res.priceList;
          } catch {
            /* empty */
          }

          return state;
        }),
      );

      return [id, priceItems];
    }),
  )) as [string, ProductState[]][];

  return productsWithData.reduce(
    (res, [id, items], idx) => {
      res[id] = items.map((item, id) => {
        const priceItem = productPrices[idx][1][id];

        return {
          ...item,
          ...priceItem,
          data: { ...item.data, ...priceItem.data },
        };
      });

      return res;
    },
    {} as Record<string, ProductState[]>,
  );
}
