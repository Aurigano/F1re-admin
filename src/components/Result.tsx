import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
	ResultProps,
	DriverResultProps,
	IDriverRows,
	IDnfArray,
} from "../../@types/race";
import DriverCards from "./DriverCards";
import getEditedResults from "../../utils/getEditedResults";

const StyledDiv = styled("div")((props) => {
	return `
		display: flex;
		flex-direction: column;
		.btn-submit {
			padding: 15px 30px;
    		margin: 20px;
    		width: max-content;
		}
	`;
});

function Results({ raceid }: { raceid: number }) {
	const [result, setResult] = useState<ResultProps>({});
	const [currentlyDragged, setCurrentlyDragged] = useState<string>("");
	// const allFalseArray = new Array(20).fill(false); <-- Fills Array with boolean value, good for initialization
	const [dnf, setDnf] = useState<IDnfArray[]>([]);
	const [fastestLap, setFastestLap] = useState<string | undefined>();

	useEffect(() => {
		// IIFE to execute async fetch inside useEffect
		(async function getResults(raceid: number) {
			// to avoid race condition
			let isCurrent = true;

			try {
				// Results API call for particular race
				const raceID = raceid.toString();
				const res = await fetch(
					"https://f1-data-api.onrender.com/raceresult",
					{
						method: "POST",
						body: JSON.stringify({
							raceid: raceID,
						}),
						headers: {
							"Content-type": "application/json; charset=UTF-8",
						},
					}
				);
				const data = await res.json();

				// to avoid race condition
				if (isCurrent) {
					setResult(data);
					let initialDnfArray: IDnfArray[] = [];
					data?.rows?.map((driver: DriverResultProps) => {
						initialDnfArray.push({
							number: driver?.number,
							dnfStatus: false,
						});
					});
					setDnf(initialDnfArray);
				}
			} catch (err) {
				console.log(err);
				setResult({ status: `err : ${err}` });
			}

			return () => {
				isCurrent = false;
			};
		})(raceid);
	}, [raceid]);

	console.log(result?.rows);

	function handleOnDrag(e: React.DragEvent) {
		console.log("dragged", (e.target as HTMLTextAreaElement).id);
		setCurrentlyDragged((e.target as HTMLTextAreaElement).id);
	}

	function handleOnDrop(e: React.DragEvent) {
		console.log("dropped", (e.target as HTMLTextAreaElement).id);
	}

	function handleOnDragOver(e: React.DragEvent) {
		e.preventDefault();
		console.log("drag-over", (e.target as HTMLTextAreaElement).id, e);
		const editedResult = getEditedResults(
			result?.rows,
			(e.target as HTMLTextAreaElement).id,
			currentlyDragged
		);
		const editedDNFArray = getEditedResults(
			dnf,
			(e.target as HTMLTextAreaElement).id,
			currentlyDragged
		);

		const copyResult = { ...result, rows: editedResult };

		if ((e.target as HTMLTextAreaElement).id.length > 0) {
			setResult(copyResult);
			setDnf(editedDNFArray);
		}
	}

	async function changeResults() {
		const updatedResultBody = {
			raceid,
			driverpositions: result?.rows,
			dnfstatus: dnf,
			fastestlapby: fastestLap,
		};
		console.log(updatedResultBody);
		const res = await fetch("http://localhost:3000/changepos", {
			method: "POST",
			body: JSON.stringify(updatedResultBody),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});
		const posStatus = await res.json();
		console.log(posStatus);
	}

	return (
		<StyledDiv>
			Results{raceid}
			<div className="cards-wrapper">
				{result?.rows?.map((driverResult: DriverResultProps, index) => (
					<DriverCards
						key={`${driverResult?.number}`}
						driverInfo={driverResult}
						index={index}
						dnf={dnf}
						setDnf={setDnf}
						fastestLap={fastestLap}
						setFastestLap={setFastestLap}
						handleOnDrag={handleOnDrag}
						handleOnDrop={handleOnDrop}
						handleOnDragOver={handleOnDragOver}
					/>
				))}
			</div>
			<Button
				variant={"contained"}
				onClick={changeResults}
				className="btn-submit"
			>
				{" "}
				Change results{" "}
			</Button>
		</StyledDiv>
	);
}

export default Results;
