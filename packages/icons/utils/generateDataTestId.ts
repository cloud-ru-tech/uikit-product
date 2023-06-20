export function generateDataTestId(componentName: string) {
  const name = componentName.replace(/(\.?svg)$/gi, '').replace(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g, x => {
    const delimiter = x.match(/^\d/) ? '' : '-';
    return `${delimiter}${x.toLowerCase()}`;
  });

  return `icon${name}`;
}
