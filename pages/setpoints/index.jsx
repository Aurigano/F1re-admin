import React from "react";
import axios from "axios";

function SetPoint() {
	const [seasonRaces, setSeasonRaces] = React.useState({});
	const [isloading, setLoading] = React.useState(true);
	React.useEffect(() => {
		async function getResults() {
			const { data } = await axios.post(
				"https://f1-data-api.onrender.com/raceyear",
				{
					year: 2023,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			// const res = await fetch(
			// 	"https://f1-data-api.onrender.com/raceyear",
			// 	{
			// 		method: "POST",
			// 		body: JSON.stringify({
			// 			year: 2023,
			// 		}),
			// 		headers: {
			// 			"Content-type": "application/json; charset=UTF-8",
			// 		},
			// 	}
			// );
			// const res = await fetch("https://f1-data-api.onrender.com/foo");
			// const data = await res.json();
			console.log(data);
			setSeasonRaces(data);
			setLoading(false);
		}

		getResults();
	}, []);

	console.log(seasonRaces);
	if (isloading) return <div>Loading...</div>;
	return <div>SetPoint</div>;
}

export default SetPoint;
