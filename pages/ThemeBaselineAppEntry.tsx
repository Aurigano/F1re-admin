import React from "react";
import { AppProps, NextComponent, AppInitialProps } from "next/app";
import { ThemeContextType } from "../@types/theme";
import { useThemeMode, ThemeCtx } from "../contexts/themecontext";
import { FiaCtx, useFia } from "../contexts/fiacontext";
import Navbar from "./navbar";
import { ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import lightTheme, { darkTheme } from "../src/theme";

const StyledDiv = styled("div")(
	() => `
	width: 100%;
	max-width: 1280px;
	margin: auto;
`
);

type MyProps = {
	Component: NextComponent;
	pageProps: any;
};

function ThemeBaselineAppEntry(props: MyProps) {
	const { Component, pageProps } = props;
	const themeFromContext = useThemeMode();
	const { darkMode } = React.useContext(ThemeCtx);
	let themeSelected = React.useMemo(() => {
		return darkMode ? darkTheme : lightTheme;
	}, [darkMode]);
	return (
		<ThemeProvider theme={themeSelected}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<Navbar />
			<StyledDiv>
				<Component {...pageProps} />
			</StyledDiv>
		</ThemeProvider>
	);
}

export default ThemeBaselineAppEntry;
