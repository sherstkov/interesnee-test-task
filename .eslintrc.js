module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    overrides: [
      {
        files: ['*.tsx'],
        rules: {
          'no-undef': 'off',
        },
      },
    ],
  },
  'react/function-component-definition': [
    2,
    {
      namedComponents: 'function-declaration',
    },
  ],
};
