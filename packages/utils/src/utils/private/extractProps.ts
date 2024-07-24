export function extractProps(props: Record<string, unknown>, regex: RegExp) {
  return Object.keys(props).reduce((nextProps: Record<string, unknown>, prop) => {
    if (prop.match(regex)) nextProps[prop] = props[prop];

    return nextProps;
  }, {});
}
