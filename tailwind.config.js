/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      type: {
        grass: '#78C850',
        poison: '#A040A0',
        fire: '#F08030',
        water: '#6890F0',
        flying: '#A890F0',
        bug: '#A8B820',
        normal: '#A8A878',
        electric: '#F8D030',
        ground: '#E0C068',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        ghost: '#705898',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
      },
    },
  },
};
export const plugins = [];
