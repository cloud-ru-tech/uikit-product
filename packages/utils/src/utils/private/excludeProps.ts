export function excludeProps(props: Record<string, unknown>, regexp: RegExp) {
  return Object.keys(props)
    .filter(prop => !prop.match(regexp))
    .reduce(
      (nextProps: Record<string, unknown>, prop) => ({
        ...nextProps,
        [prop]: props[prop],
      }),
      {},
    );
}
