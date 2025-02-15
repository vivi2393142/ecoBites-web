module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
    'prettier',
  ],
  plugins: ['mui-unused-classes'],
  ignorePatterns: ['**/node_modules/**', '.eslintrc.js', 'vite.config.ts'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-restricted-imports': [
      'error',
      {
        paths: ['@mui/material', 'lodash'],
        patterns: ['@mui/material/*/*/*'],
      },
    ],
    'mui-unused-classes/unused-classes': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-expression', 'arrow-function'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  overrides: [],
};
