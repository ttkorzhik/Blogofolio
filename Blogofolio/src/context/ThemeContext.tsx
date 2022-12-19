import React, {createContext, FC, ReactNode, useContext, useEffect, useMemo, useState} from 'react';

type WithChildren = {
    children: ReactNode
}

enum ThemeVariant {
    light = "light",
    dark = "dark"
}

interface ThemeContextValue {
    theme: ThemeVariant | string
    setTheme: (theme: ThemeVariant) => void
    isDarkTheme: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const ThemeProvider:FC<WithChildren> = ({ children }) =>  {

    const [theme, setTheme] = useState("");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme) {
            setTheme(currentTheme);
        }
    },[theme])

    const handleSetTheme = (newTheme: ThemeVariant) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }
    const isDarkTheme = useMemo(()=> theme === ThemeVariant.dark, [theme])
    return (

        <ThemeContext.Provider value={{
            theme: theme,
            setTheme: handleSetTheme,
            isDarkTheme: isDarkTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error("useTheme must be used with ThemeProvider")
    }
    else {
        return context
    }
}


export {useTheme, ThemeProvider, ThemeVariant}