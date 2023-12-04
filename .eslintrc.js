module.exports = {
  root: true,

  parserOptions: {
    sourceType: 'module',
  },

  extends: ['@metamask/eslint-config'],

  overrides: [
    {
      files: ['*.js'],
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['*.ts', '*.tsx'],
      extends: ['@metamask/eslint-config-typescript'],
      rules: {
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          { allowNullish: true },
        ],
        '@typescript-eslint/naming-convention': 'off',
        camelcase: 'off',
        '@typescript-eslint/camelcase': ['off'],
      },
    },

    {
      files: ['*.test.ts', '*.test.js'],
      extends: ['@metamask/eslint-config-jest'],
      rules: {
        '@typescript-eslint/no-shadow': [
          'error',
          { allow: ['describe', 'expect', 'it'] },
        ],
      },
    },
  ],
  rules: {
    'jsdoc/require-jsdoc': 'off',
  },
  ignorePatterns: [
    '!.prettierrc.js',
    '**/!.eslintrc.js',
    '**/dist*/',
    '**/*__GENERATED__*',
    '**/build',
    '**/public',
    '**/.cache',
  ],
};
