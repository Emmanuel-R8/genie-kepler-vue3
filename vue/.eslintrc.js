module.exports = {
    root: true,

    env: {
        browser: true,
        es2021: true,
        jest: true
    },

    extends: [
        'plugin:prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
        'plugin:prettier/recommended',
        // 'plugin:vue/vue3-essential',
        // 'plugin:vue/vue3-base',
        // 'plugin:vue/vue3-strongly-recommended',
        // 'plugin:vue/vue3-recommended',
    ],

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname
    },

    plugins: [
        'prettier',
        '@typescript-eslint',
        'jest'],

    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off'
    }
}
