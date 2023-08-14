module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'next'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-unused-vars': 'error',
    'no-console': 'error',
    'react/prop-types': 'error',
    'react-hooks/exhaustive-deps': 'off', // quitar esta linea mas adelante
    '@next/next/no-img-element': 'off' // quitar esta linea mas adelante
  },
  globals: {
    process: true
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
