import astroPlugin from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
    {
        files: ['**/*.js', '**/*.ts', '**/*.astro'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    ...tseslint.configs.recommended,
    ...astroPlugin.configs.recommended,
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroPlugin.parser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.astro'],
            },
        },
        rules: {
            'astro/no-conflict-set-directives': 'error',
            'astro/no-unused-define-vars-in-style': 'error',
        },
    },
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
    {
        ignores: ['dist/', '.astro/', 'node_modules/'],
    },
];
