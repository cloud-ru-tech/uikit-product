module.exports = {
  extends: '@cloud-ru/ft-config-stylelint',
  ignoreFiles: [
    '**/dist/**',
    '**/stories/**/*.{css,scss}',
    '**/storybook/**/*.{css,scss}',
    '**/storybook-static/**',
    'packages/mobile-drawer/src/components/MobileDrawerCustom/motion.css',
    'storybook/stories/components/markdown/theme/style.css',
  ],
};
