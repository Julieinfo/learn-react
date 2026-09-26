/* Responsabilité : déclencher le changement de thème via le Context dédié. */
import React from 'react';
import { useTheme } from '../context/ThemeContext';

function BoutonTheme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
        Mode {theme === 'light' ? 'sombre 🌙' : 'clair ☀️'}
        </button>
    );
}

export default BoutonTheme;