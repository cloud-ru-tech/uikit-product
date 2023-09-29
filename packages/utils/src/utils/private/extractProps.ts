export function extractProps(props: object, regex: RegExp) {
  return Object.keys(props).reduce((nextProps, prop) => {
    if (prop.match(regex)) nextProps[prop] = props[prop];

    return nextProps;
  }, {});
}
