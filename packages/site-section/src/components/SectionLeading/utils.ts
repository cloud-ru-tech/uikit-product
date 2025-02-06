const CARD_LEADING_MINIMAL_WIDTH = 328;
const MAX_PER_PAGE = 3;

export const calculateAmountOfItemsPerPage = (wrapperWidth: number): number => {
  const amount = Math.floor(wrapperWidth / CARD_LEADING_MINIMAL_WIDTH);
  if (amount < 1) {
    return 1;
  }

  return amount > MAX_PER_PAGE ? MAX_PER_PAGE : amount;
};
