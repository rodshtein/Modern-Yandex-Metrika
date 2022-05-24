module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  rules: {
    indent: [2, 2, {SwitchCase: 1}],
    'space-before-function-paren': "error",
    "keyword-spacing": [2, {
      "before": true, 
      "after": true
    }],
    "spaced-comment": [2, "always"],
    "brace-style": ["error", "1tbs", { 
      "allowSingleLine": true 
    }],
    "arrow-spacing": ["error", { 
      "before": true, 
      "after": true 
    }],
    "array-bracket-spacing": "error",
    "space-in-parens": "error",
    "object-curly-spacing": "error",
    "computed-property-spacing": "error",
    "space-before-blocks": "error",
    "block-spacing": ["error", "never"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
    jest: true
  }
};
