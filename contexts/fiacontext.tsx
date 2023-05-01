import { ThemeContextType } from "../@types/theme";
import {
	FiaContextType,
	DriverResponse,
	IDriverRows,
	ConstructorResponse,
} from "../@types/race";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};
// const defaultStateOfTheme = {
// 	darkMode: false,
// };

export const FiaCtx = createContext<FiaContextType>({});
// Creates a new context object

export function FiaCtxProvider({ children }: Props) {
	// check whether the client's system has enabled dark theme
	// if enabled then, use dark theme by default
	// const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	// state variable to check wheather dark mode is enabled or not
	const [drivers, setDrivers] = useState<DriverResponse>({});
	const [constructors, setConstructors] = useState<ConstructorResponse>({});

	useEffect(() => {
		// IIFE for drivers
		(async function getDrivers() {
			const res = await fetch(
				"https://f1-data-api.onrender.com/drivers",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);
			const data = await res.json();
			setDrivers(data);
		})();

		// IIFE for constructors
		(async function getConstructors() {
			const res = await fetch(
				"https://f1-data-api.onrender.com/constructors",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);
			const data = await res.json();
			setConstructors(data);
		})();
	}, []);

	// return the, Provider component that allows the
	// consuming components to subscribe to context
	// changes.
	return (
		<FiaCtx.Provider value={{ constructors, drivers }}>
			{children}
		</FiaCtx.Provider>
	);
}

export function useFia() {
	// return the current context value for themeCtx
	// i.e. darkMode and handleDarkMode
	return useContext<FiaContextType>(FiaCtx);
}
