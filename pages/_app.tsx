import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme, { darkTheme } from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Navbar from "./navbar";
import {
	ThemeCtxProvider,
	useThemeMode,
	ThemeCtx,
} from "../contexts/themecontext";
import { FiaCtxProvider } from "../contexts/fiacontext";
import { ThemeContextType } from "../@types/theme";
import ThemeBaselineAppEntry from "../src/ThemeBaselineAppEntry";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;
	// const darkMode :boolean | null  = theme?.darkMode;
	// let themeSelected = React.useMemo(() => {
	// 	return darkMode ? darkTheme : theme;
	// }, [darkMode]);
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeCtxProvider>
				<FiaCtxProvider>
					<ThemeBaselineAppEntry
						Component={Component}
						pageProps={pageProps}
					/>
				</FiaCtxProvider>
			</ThemeCtxProvider>
		</CacheProvider>
	);
}
