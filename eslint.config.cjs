// @ts-check

const foxglove = require("@foxglove/eslint-plugin");
const globals = require("globals");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  {
    ignores: ["**/dist"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.eslint.json",
      },
    },
  },
  ...foxglove.configs.base,
  ...foxglove.configs.jest,
  ...foxglove.configs.typescript,
  {
    files: ["eslint.config.cjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
