module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:import/errors", "plugin:import/warnings"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "import"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/order": ["error",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups":[{
          "pattern": "react",
          "group": "external",
          "position": "before"
        }],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive":true
        }
      }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    'no-console': 'warn',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'prefer-const': 'error',
    'indent': ['error', 2],
    'max-len': ['error', { code: 140 }],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'never'],
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
      },
      "node_modules": true,
    }
  }
}
