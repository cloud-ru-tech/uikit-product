const path = require('path');

const getBaseName = pathName => path.basename(pathName, path.extname(pathName));

const defaultIndexTemplate = filePaths => {
  if (![2, 1].includes(filePaths.length)) {
    throw new Error('Adaptive icon can include one or two svg components.');
  }

  const [light, dark] = filePaths.sort().reverse();
  const dirName = path.basename(path.dirname(light.path));
  const lightBasename = getBaseName(light.path);

  if (!dark) {
    return [`export * from "./${lightBasename}";`, `export { default } from "./${lightBasename}";`].join('\n');
  }

  const darkBasename = getBaseName(dark.path);

  return `
    import { Ref, forwardRef } from 'react'
    import ${dirName}Light, { ISvgIconProps } from './${lightBasename}';
    import ${dirName}Dark from './${darkBasename}';
    import { useThemeModification, useBrandModification } from '../../utils';

    const ${dirName}Svg = forwardRef(function ${dirName}Svg(props: ISvgIconProps, ref: Ref<SVGSVGElement>) {
      const { isDarkTheme } = useThemeModification();
      const { isDarkBrand } = useBrandModification();
    
      return isDarkTheme || isDarkBrand 
        ? <${dirName}Dark {...props} ref={ref} />
        : <${dirName}Light {...props} ref={ref} />;
    });
    
    export default ${dirName}Svg;
  `;
};

module.exports = defaultIndexTemplate;
