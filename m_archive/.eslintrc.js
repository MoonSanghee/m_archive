module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    jsx: true,
    useJSXTextNode: true,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:react/recommended',
  ],
  plugins: ['import', 'prettier', 'react', 'react-hooks', 'import'],
  settings: { react: { version: 'detect' } },

  rules: {
    'prettier/prettier': 'error',
    'no-implicit-coercion': 'error',

    'no-undef': 'off',

    'no-extra-boolean-cast': 'off',

    'getter-return': 'warn',

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'util',
            importNames: ['isArray'],
            message: '`Array.isArray`를 대신 사용해주세요!',
          },
        ],
      },
    ],

    'no-async-promise-executor': 'warn',

    'prefer-const': 'error',
    'no-var': 'error',
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'import/no-duplicates': 'error',

    'react/prop-types': 'off',

    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    'react/jsx-no-target-blank': 'error',

    'react/react-in-jsx-scope': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: 'src/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['src/**', '@/**'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
 
};
