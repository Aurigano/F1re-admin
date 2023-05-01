import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Results from "../../src/components/Result";

function setPointOfRace(props: any) {
	const racesOfYear = props.data.rows.map(function (race: any) {
		return { ...race, label: race.name };
	});
	const [race, setRace] = React.useState(racesOfYear[0]);

	return (
		<div>
			Select race
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				value={race}
				onChange={(event, newValue) => {
					setRace(newValue);
				}}
				options={racesOfYear}
				sx={{ width: 300 }}
				renderInput={(params) => {
					return <TextField {...params} label="Races" />;
				}}
			/>
			<Results raceid={race.raceid} />
		</div>
	);
}

export default setPointOfRace;

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch("https://f1-data-api.onrender.com/raceyear", {
		method: "POST",
		body: JSON.stringify({
			year: 2023,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});
	const data = await res.json();

	// Pass data to the page via props
	return { props: { data } };
}
