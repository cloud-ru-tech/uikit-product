export function getPriceChangeAppearance(value: number) {
  if (value > 0) {
    return 'increased';
  }

  if (value < 0) {
    return 'decreased';
  }

  return 'unchanged';
}
