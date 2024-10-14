const defaultRules = ['eslint:recommended'];

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [...defaultRules, 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript'],
  plugins: ['import'],
  rules: {
    'array-callback-return': 'warn',
    'consistent-return': 'warn',
    'default-case': 'warn',
    // etc.
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      plugins: ['@typescript-eslint'],
      extends: [...defaultRules, 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-expressions': 'warn',
        'import/no-anonymous-default-export': 0,
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false,
            },
          },
        ],
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true,
            },
          },
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
      },
    },
  },
};
