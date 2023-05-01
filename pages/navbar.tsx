import IconButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
import { useThemeMode, ThemeCtx } from "../contexts/themecontext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const StyledDiv = styled("div")(
	() => `
	width: 100%;
	display: flex;
	max-width: 1280px;
	margin: auto;
	.darkModeToggleButton {
		margin: 25px 50px 0 auto;
	}
`
);

function Navbar() {
	const { darkMode, handleDarkMode } = React.useContext(ThemeCtx);
	const themeanswer = useThemeMode();
	const handleClick = (): void => {
		handleDarkMode?.();
		console.log(darkMode);
	};

	return (
		<StyledDiv>
			<IconButton
				aria-label="darkModeToggleButton"
				className="darkModeToggleButton"
				onClick={handleClick}
			>
				{darkMode ? <DarkModeIcon /> : <LightModeIcon />}
			</IconButton>
		</StyledDiv>
	);
}

export default Navbar;
