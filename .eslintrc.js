module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  "env": {
    "node": true,
    "commonjs": true,
    "browser": true,
    "es6": true
  },
  "rules": {
    "semi": "error",
    "indent": ["error", 2],
    "quotes": ["error", "single"]
  }
}