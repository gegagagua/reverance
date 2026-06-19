import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Hard ceiling on file size — the lever that forces the ui/logic/state split.
      'max-lines': ['error', { max: 120, skipBlankLines: true, skipComments: true }],
      'react/jsx-no-useless-fragment': 'warn',
    },
  },
  // Keep ESLint out of formatting; Prettier owns it. Must stay last.
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'reverance-old/**']),
])

export default eslintConfig
