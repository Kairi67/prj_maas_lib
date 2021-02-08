module.exports = {
  env: {
    "browser": true,
    "es6": true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:prettier/recommended",
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    allowImportExportEverywhere: true,
  },
  plugins: [
    "vue",
    "prettier",
  ],
  rules: {
    'no-unused-vars': 1,
    "no-var": "error",
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};