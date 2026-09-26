/* Responsabilité : partager le thème et synchroniser sa préférence avec le stockage local. */
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Lecture initiale dans le localStorage (avec 'light' par défaut)
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('app-theme') || 'light';
    });

    // Sauvegarde dans le localStorage dès que le thème change
    useEffect(() => {
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    // Le hook centralise l'accès au contexte et évite de propager sa structure interne.
    return useContext(ThemeContext);
}