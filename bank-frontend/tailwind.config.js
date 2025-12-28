/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Bankati - Verts naturels et professionnels
        bankati: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#40916c',  // Couleur principale
          600: '#2d6a4f',  // Couleur foncée
          700: '#1a4d2e',  // Très foncé
          800: '#14532d',
          900: '#052e16',
        },
        // Couleurs complémentaires
        accent: {
          cyan: '#0891b2',
          purple: '#7c3aed',
          orange: '#ea580c',
        }
      },
      boxShadow: {
        'bankati': '0 10px 40px rgba(45, 106, 79, 0.2)',
        'bankati-lg': '0 20px 50px rgba(45, 106, 79, 0.3)',
      },
      backgroundImage: {
        'gradient-bankati': 'linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 50%, #40916c 100%)',
        'gradient-bankati-light': 'linear-gradient(135deg, #2d6a4f 0%, #40916c 50%, #52b788 100%)',
      }
    },
  },
  plugins: [],
}