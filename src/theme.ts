import { Sora } from "next/font/google";
import { red } from "@mui/material/colors";
import Button, { ButtonPropsColorOverrides } from "@mui/material/Button";
import { createTheme, PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		divStyles?: PaletteColorOptions;
	}
	interface PaletteOptions {
		divStyles?: PaletteColorOptions;
	}
	interface PaletteColorOptions {
		main?: React.CSSProperties["color"];
		backgroundColor?: React.CSSProperties["color"];
		textColor?: React.CSSProperties["color"];
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		myAwesomeColor: true;
	}
}

export const sora = Sora({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Inter", "Work Sans", "sans-serif"],
});

// Create a theme instance.
const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
		divStyles: {
			backgroundColor: "#e1e1e1",
			textColor: "#626262",
		},
	},
	typography: {
		fontFamily: sora.style.fontFamily,
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		divStyles: {
			backgroundColor: "#333333",
			textColor: "#b1b1b1",
		},
	},
	typography: {
		fontFamily: sora.style.fontFamily,
	},
});

export default lightTheme;
