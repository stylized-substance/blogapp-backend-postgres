import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {ignores: ["postgresql"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];