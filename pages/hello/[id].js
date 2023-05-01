import React from "react";
import { styled } from "@mui/material/styles";

const StyledDiv = styled("div")(
	() => `
	background: red;
	border: 2px solid black;
    `
);

function Details() {
	return <StyledDiv>Details</StyledDiv>;
}

export default Details;
