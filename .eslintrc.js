module.exports = {
  extends: 'eslint-config-divisio',
  env: {
    browser: true
  },
  rules: {
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'react/no-array-index-key': 'off',
    'react/jsx-one-expression-per-line': ['off', { allow: 'literal' }],
    'react/jsx-props-no-spreading': 'warn',
    'react/prop-types': 'off',
    'array-callback-return': 'off',
    'import/extensions': 0,
  },
  globals: {
    describe: true,
    document: true,
    expect: true,
    jest: true,
    it: true
  }
};
