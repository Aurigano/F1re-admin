import React from "react";
async function getResults(raceid: number) {
	try {
		// Results API call for particular race
		const res = await fetch("https://f1-data-api.onrender.com/raceresult", {
			method: "POST",
			body: JSON.stringify({
				raceid: "1096",
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
		return { status: `err : ${err}` };
	}
}

function Results({ raceid }: { raceid: number }) {
	const data = getResults(raceid);
	React.useEffect(() => {
		console.log(raceid);
	}, [raceid]);
	console.log(data);
	return <div>Results{raceid}</div>;
}

export default Results;
