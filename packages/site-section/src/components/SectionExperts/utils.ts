const EXPERT_MINIMAL_WIDTH = 240;
const MAX_PER_PAGE = 4;

export const calculateAmountOfItemsPerPage = (wrapperWidth: number): number => {
  const amount = Math.floor(wrapperWidth / EXPERT_MINIMAL_WIDTH);
  return amount > MAX_PER_PAGE ? MAX_PER_PAGE : amount;
};
