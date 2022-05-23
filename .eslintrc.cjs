module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  rules: {
    indent: [2, 2, {SwitchCase: 1}],
    'space-before-function-paren': ["error", "never"],
    "keyword-spacing": [2, {
      "before": true, 
      "after": true
    }],
    "spaced-comment": [2, "always"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
    jest: true
  }
};
