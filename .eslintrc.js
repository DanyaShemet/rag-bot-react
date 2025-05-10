module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    plugins: ['react', 'jsx-a11y', '@typescript-eslint', 'import'],
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'react/react-in-jsx-scope': 'off', // не потрібен у React 17+
        'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
        '@typescript-eslint/no-unused-vars': ['warn'],
    },
}
