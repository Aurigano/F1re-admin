import { ThemeContextType } from "../@types/theme";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};
const defaultStateOfTheme = {
	darkMode: false,
};

export const ThemeCtx = createContext<ThemeContextType>(defaultStateOfTheme);
// Creates a new context object

export function ThemeCtxProvider({ children }: Props) {
	// check whether the client's system has enabled dark theme
	// if enabled then, use dark theme by default
	// const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	// state variable to check wheather dark mode is enabled or not
	const [darkMode, setDarkMode] = useState<boolean>(false);

	useEffect(() => {
		if (localStorage.getItem("theme") === "dark") {
			// if user has opted for dark theme
			// then set the value of darkMode as true
			setDarkMode(true);
		} else if (localStorage.getItem("theme") === "light") {
			// if user has opted for light theme
			// then set the value of darkMode as false
			setDarkMode(false);
		} else {
			// if there is nothing in the local storage
			// then, use the system theme by default
			setDarkMode(false);
		}
	}, []);

	// toggle the theme function
	function handleDarkMode(): void {
		if (darkMode) {
			// if dark theme is enabled,
			// then disable it and select the light theme
			localStorage.setItem("theme", "light");
			setDarkMode(false);
		} else {
			// if dark theme is disabled,
			// then enable it and select the dark theme
			localStorage.setItem("theme", "dark");
			setDarkMode(true);
		}
	}

	// return the, Provider component that allows the
	// consuming components to subscribe to context
	// changes.
	return (
		<ThemeCtx.Provider value={{ darkMode, handleDarkMode }}>
			{children}
		</ThemeCtx.Provider>
	);
}

export function useThemeMode(): ThemeContextType | {} {
	// return the current context value for themeCtx
	// i.e. darkMode and handleDarkMode
	return useContext<ThemeContextType>(ThemeCtx);
}
