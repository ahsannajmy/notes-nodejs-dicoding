import globals from 'globals';
import pluginJs from '@eslint/js';
// import dastyle from 'eslint-config-dicodingacademy';

export default [
  // dastyle,
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];