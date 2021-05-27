const getRandomInt: (min: number, max: number) => number = (min = 0, max = 100) => {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);
  return Math.floor(Math.random() * (flooredMax - ceiledMin + 1)) + ceiledMin;
};

export default getRandomInt;
