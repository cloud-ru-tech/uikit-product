const generateDataTestId = require('./generateDataTestId');

const template =
  ({ size }) =>
  ({ imports, interfaces, componentName, jsx, exports }, { tpl }) => {
    const testId = 'icon' + generateDataTestId(componentName);

    const componentProp = Boolean(size)
      ? `{ size = ${size}, fill, ...props }: ISvgIconProps`
      : `{ size, fill, ...props }: ISvgIconProps`;

    return tpl`
    ${`
    // DO NOT EDIT IT MANUALLY
    
    `}
    ${imports}
    ${interfaces}
    ${`
    
    `}
    export interface ISvgIconProps extends SVGProps<SVGSVGElement> {
      className?: string;
      size?: number;
      style?: React.CSSProperties;
    }

    const ${componentName} = React.forwardRef((${componentProp}, ref: React.Ref<SVGSVGElement>) => {
      props.width = undefined;
      props.height = undefined;
      
      const testId = "${testId}";
      
      const style: React.CSSProperties = {};
      const isCustomSize = typeof size === "number"
      if (isCustomSize) {
        style.width = size+"px";
        style.height = size+"px";

        if(!props.style) props.style = {};
        props.style.width = size+"px";
        props.style.height = size+"px";
      }

      return ${jsx};
    })
    
    ${exports}
    `;
  };

module.exports = template;
