import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { combinedDarkThemes, combinedLightThemes } from "../components/Theme";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeToggle from "../components/ThemeToggle";
// const async_storage_key = '@namespace:value';
const async_storage_key = '@4-exercise-app';

//create a react context for current time
export const ThemeContext = createContext();

//theme conext provider (makes data available to all descendant coamponents)
export function ThemeProvider({ children }) {
    const systemTheme = useColorScheme();
    const [overrideTheme, setOverrideTheme] = useState(null);

    //Load  saved theme on startup (AsyncStorage)
    useEffect(() => {
        (async () => {
            try {
                const saved = await AsyncStorage.getItem(async_storage_key);
                if (saved === "light" || saved === "dark") {
                    setOverrideTheme(saved);
                }
            } catch (err) {
                console.warn("Failed to load theme", err);
            }
        })();
    }, []);

    useEffect(() => {
        if (overrideTheme !== null) {
            AsyncStorage.setItem(async_storage_key, overrideTheme);
        }
    }, [overrideTheme]);

    const toggleTheme = () => {
        setOverrideTheme(prev =>
            prev === "light"
                ? "dark"
                : prev === "dark"
                    ? "light"
                    : systemTheme === "dark"
                        ? "light"
                        : "dark"
        );
    }

    const theme = useMemo(() => {
        if (overrideTheme === "light") return combinedLightThemes;
        if (overrideTheme === "dark") return combinedDarkThemes;

        return systemTheme === "dark"
            ? combinedDarkThemes
            : combinedLightThemes;
    },
        [systemTheme, overrideTheme]);

    return (
        <ThemeContext.Provider value={{ theme, overrideTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
export function useTheme() {
    return useContext(ThemeContext);
}

export function useLogo() {
    const { theme, overrideTheme } = useTheme();
    return overrideTheme === "dark"
        ? theme.assets.logoDark
        : theme.assets.logoLight;
}