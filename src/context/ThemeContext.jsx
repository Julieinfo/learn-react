import React, { createContext, useState, useContext } from 'react';

// 1. Création du contexte
const ThemeContext = createContext();

// 2. Composant Provider
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}

// 3. Custom Hook dédié pour simplifier la consommation
export function useTheme() {
    return useContext(ThemeContext);
}