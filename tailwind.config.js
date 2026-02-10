module.exports = {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './vendor/filament/**/*.blade.php', // For Filament styling if needed
  ],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  darkMode: 'class', // Enable class-based dark mode
};
