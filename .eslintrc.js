module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard', '@vue/typescript/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    indent: ['off', 2],
    semi: 0,
    'multiline-ternary': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'dot-notation': ['error', { allowPattern: '^[_a-z]+([_a-z]+)+$' }],
    'symbol-description': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'func-call-spacing': 'off'
  }
}
