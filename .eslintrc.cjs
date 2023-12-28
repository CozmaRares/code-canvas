module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "no-constant-condition": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true },
    ],
  },
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "src/components/ui",
    "vitest.config.js",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
};
