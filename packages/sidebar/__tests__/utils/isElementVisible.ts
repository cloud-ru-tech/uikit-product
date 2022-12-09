export function isElementVisible(element: Element): boolean {
  if (element.clientHeight === 0 || getComputedStyle(element).opacity === '0') {
    return false;
  }

  if (!element.parentElement) {
    return true;
  }

  if (element.parentElement.getAttribute('data-test-id') === 'sidebar') {
    return true;
  }

  return isElementVisible(element.parentElement);
}
