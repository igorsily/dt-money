import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'off',
      'simple-import-sort/imports': [
        "error",
        {
          "groups": [
            /* Style imports */
            ["^.+\\.?(css)$"],

            /* elysia imports */
            ["^elysia", "^@elysiajs"],

            /* Absolute import */
            ["^@?\\w"],

            /* Side effect imports */
            ["^(\\u0000|@?\\w)(/.*|$)"],

            /* Parent imports. Put `..` last */
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

            /* Other relative imports. Put same-folder imports and `.` last */
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
          ]
        }
      ]
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'drizzle/**']
  }
]