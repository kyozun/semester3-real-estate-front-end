/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            animation: {
                'pulse-scale': 'pulse 2s infinite', // Example: scaling pulse effect
            },
            keyframes: {
                'pulse-scale': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.6)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],

    corePlugins: { preflight: false },
}
