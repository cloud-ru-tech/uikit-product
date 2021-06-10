const template =
  ({ size }) =>
  ({ template }, opts, { imports, interfaces, componentName, props, jsx, exports }) => {
    const plugins = ['jsx', 'typescript'];
    const typeScriptTpl = template.smart({ plugins });

    opts.expandProps = [];

    const componentProp = Boolean(size)
      ? `{ size = ${size}, ...props }: ISvgIconProps`
      : `{ size, ...props }: ISvgIconProps`;

    return typeScriptTpl.ast`
    ${`
    // DON NOT EDIT IT MANUALLY
    
    `}
    
    ${imports}
    ${interfaces}

    interface ISvgIconProps extends React.SVGProps<SVGSVGElement> {
      className?: string;
      wrapperSize?: string | number;
      size?: string | number;
      wrapperClasses?: string;
      style?: React.CSSProperties;
    }

    const ${componentName} = (${componentProp}): React.ReactElement | null => {
      props.width = undefined;
      props.height = undefined;

      const style: React.CSSProperties = {};
      const isCustomSize = typeof size === "number"
      if(isCustomSize) {
        style.width = size+"px";
        style.height = size+"px";

        if(!props.style) props.style = {};
        props.style.width = size+"px";
        props.style.height = size+"px";
      }

      return ${jsx};
    }
    
    ${exports}
    `;
  };

module.exports = template;
