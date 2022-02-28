export const DEFAULT_STYLES = {
  COMMON: `
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  
    &::after,
    &::before {
      box-sizing: border-box;
    }
  `,
  BORDERLESS: `
    border: none;
    border-radius: 0;
  `,
};

export const ANIMATIONS = {
  TRANSITION: '0.2s ease-in-out',
};
