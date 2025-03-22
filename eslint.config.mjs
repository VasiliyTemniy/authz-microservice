// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'semi': [
        'error'
      ],
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/restrict-plus-operands': 0,
      '@typescript-eslint/no-base-to-string': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_'
        }
      ],
      '@typescript-eslint/array-type': 0,
      '@typescript-eslint/no-explicit-any': 1,
      'no-case-declarations': 0,
      'indent': [
        'warn',
        2,
        { 
          'SwitchCase': 1,
          'flatTernaryExpressions': true
        }
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'no-useless-escape': 0,
      'quotes': [
        2, 'single', {
          'avoidEscape': true, 'allowTemplateLiterals': true
        }
      ],
      'max-len': [
        'warn',
        {
          'code': 130,
          'tabWidth': 2,
          'ignoreComments': true,
          'ignoreStrings': true,
          'ignoreTemplateLiterals': true,
          'ignoreRegExpLiterals': true
        }
      ],
      'object-curly-spacing': [
        'warn',
        'always',
        {
          'arraysInObjects': true
        }
      ]
    },
    ignores: [
      'src/submodules/**/*'
    ]
  }
);