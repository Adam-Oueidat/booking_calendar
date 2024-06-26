// @ts-check

// Core
const eslint = require("@eslint/js");
const globals = require("globals");
const tsEslint = require("typescript-eslint");

// Plugins
const reactRecommended = require("eslint-plugin-react/configs/recommended");
const compilerPlugin = require("eslint-plugin-react-compiler");
const nextPlugin = require("@next/eslint-plugin-next");
const stylistic = require("@stylistic/eslint-plugin");

// Utils
const { FlatCompat } = require("@eslint/eslintrc");
const { fixupConfigRules } = require("@eslint/compat");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = tsEslint.config(
  {
    ignores: [".next/*"],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  reactRecommended,
  {
    rules: {
      // NextJS will handle this for us
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        // Only necessary to suppress warning
        version: "detect",
      },
    },
  },
  // REVIEW: Possibly compiler plugin replaces the need for this?
  /** @see https://eslint.org/blog/2024/05/eslint-compatibility-utilities/#using-with-flatcompat */
  ...fixupConfigRules(compat.extends("plugin:react-hooks/recommended")),
  {
    plugins: {
      "react-compiler": compilerPlugin,
    },
    rules: {
      "react-compiler/react-compiler": "warn",
    },
  },
  {
    "rules": {
    "@typescript-eslint/consistent-type-definitions": [
      "error",
      "type"
    ]
  }
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    // REVIEW: Why am I not seeing this error in tsc cli?
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    rules: {
      curly: "warn",
    },
  },
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/semi": ["warn"],
    },
  },
  {
    // Teat some some config files with forced .js extension as common-js
    files: ["next.config.js", "eslint.config.js", "prettier.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },
);