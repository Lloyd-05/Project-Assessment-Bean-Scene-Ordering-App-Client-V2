import { MD3LightThem, MD3DarkTheme, adaptNavigationTheme, MD3LightTheme } from "react-native-paper";
import { DefaultTheme as NavLightTheme, DarkTheme as NavDarkTheme } from "@react-navigation/native";

/**
 * Combines Paper UI and React Navigation theme objects together into a single theme
 * @param {*} paperTheme The paper UI theme
 * @param {*} navigationTheme the React Navigation theme
 * @param {*} overrides Styles that will override any defaults
 * @returns a conbined theme object with consistent styles
 */

function combineThemes(paperTheme, navigationTheme, overrides = {}) {
    return {
        //pull in nav styles
        ...navigationTheme,
        //pull in paper styles
        ...paperTheme,
        //Pull in overrides
        ...overrides,
        //merge colours
        colors: {
            ...navigationTheme.colors,
            ...paperTheme.colors,

            // Navigation → MD3 mapping
            card: paperTheme.colors.surface,
            text: paperTheme.colors.onSurface,
            border: paperTheme.colors.outline,

            // Bean Scene Primary Palette
            beanDarkBlue: "#083944",
            beanMidBlue: "#2F6672",
            beanLightBlue: "#4AA1B5",
            white: "#FFFFFF",

            // Bean Scene Secondary Palette
            beanGold: "#EBC136",
            beanPaleGold: "#F8E8B5",
            beanDarkGold: "#CC9E09",
            beanLightGrey: "#E0E0E0",

            // MD3 semantic overrides (brand-aligned)
            primary: "#4AA1B5",        // Bean Light Blue
            onPrimary: "#FFFFFF",
            secondary: "#EBC136",      // Bean Gold
            onSecondary: "#083944",    // Bean Dark Blue (strong contrast)
            background: "#FFFFFF",
            surface: "#FFFFFF",
            onSurface: "#083944",      // Bean Dark Blue (body text)
            outline: "#2F6672",        // Bean Mid Blue

            // Allow custom overrides
            ...overrides?.colors
        },
        assets: {
            logoLight: require("../../assets/images/logo/png/logo-primary-transparent.png"),
            logoDark: require("../../assets/images/logo/png/logo-secondary-transparent.png")
        }
    };
}

// MD3LightTheme.colors;
// NavLightTheme.colors.notification;


export const combinedLightThemes = combineThemes(MD3LightTheme, NavLightTheme, {
    colors: {
        background: "#FFFFFF",
        surface: "#E0E0E0",
        text: "#000000",       // Bean Dark Blue
        primary: "#4AA1B5",
        secondary: "#EBC136",
    }
});

export const combinedDarkThemes = combineThemes(MD3DarkTheme, NavDarkTheme, {
    colors: {
        background: "#353535",   // Bean Dark Blue
        surface: "#E0E0E0",      // Bean Mid Blue
        text: "#FFFFFF",
        primary: "#4AA1B5",
        secondary: "#EBC136",
    }
});