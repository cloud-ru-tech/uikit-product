export function generateDataTestId(componentName: string) {
  if (componentName === 'SvgExtensionSVG') return 'icon-svg-extension';
  return 'icon' + componentName.replaceAll(/svg/gi, '').replace(/[A-Z]/g, x => '-' + x.toLowerCase());
}
