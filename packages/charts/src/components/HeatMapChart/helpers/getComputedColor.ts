export function getComputedColor(el: HTMLElement, prop: string): string {
  const styles = getComputedStyle(el);

  return styles.getPropertyValue(prop);
}
