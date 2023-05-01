import React from "react";
import { styled } from "@mui/material";

const StyledDiv = styled("div")(
	(props) => `
        background: #EFEFEF20;
        width: 500px;
        padding: 20px;
        margin: 5px;
		.dragging {
			opacity: 0.5; 
		}
    `
);
const StyledContainer = styled("div")(
	(props) => `
        // background: #EFEFEF20;
        // width: 500px;
        // padding: 20px;
        // margin: 5px;
		.dragging {
			opacity: 0.5; 
		}
    `
);

function getShiftedArr(
	arr: number[],
	currentElement: string,
	draggedElement: string
) {
	const copyArray = [...arr];
	const indexOfCurrentlyDraggedOverElement = copyArray.indexOf(
		parseInt(currentElement)
	);
	const temp = copyArray[indexOfCurrentlyDraggedOverElement];

	const indexOfDraggedElement = copyArray.indexOf(parseInt(draggedElement));

	copyArray[indexOfCurrentlyDraggedOverElement] =
		copyArray[indexOfDraggedElement];
	copyArray[indexOfDraggedElement] = temp;

	return copyArray;
}

function DragTest() {
	const [arr, setArr] = React.useState<Array<number>>([1, 2, 3, 4]);
	const [draggedElem, setDraggedElem] = React.useState<string>("");
	function handleOnDrag(e: React.DragEvent) {
		console.log("dragged", (e.target as HTMLTextAreaElement).id);
		const draggedElement = document.getElementById(
			(e.target as HTMLTextAreaElement).id
		);
		draggedElement?.classList.add("dragging");
		setDraggedElem((e.target as HTMLTextAreaElement).id);
	}

	function handleOnDragEnd(e: React.DragEvent) {
		const draggedElement = document.getElementById(
			(e.target as HTMLTextAreaElement).id
		);
		draggedElement?.classList.remove("dragging");
	}

	function handleOnDrop(e: React.DragEvent) {
		console.log("dropped", (e.target as HTMLTextAreaElement).id);
	}

	function handleOnDragOver(e: React.DragEvent) {
		e.preventDefault();
		console.log("drag-over", (e.target as HTMLTextAreaElement).id);
		const editedArr = getShiftedArr(
			arr,
			(e.target as HTMLTextAreaElement).id,
			draggedElem
		);
		setArr(editedArr);
		console.log(editedArr);
	}

	return (
		<StyledContainer>
			{arr.map((number: number) => (
				<StyledDiv
					id={`${number}`}
					key={`${number}`}
					draggable
					onDragStart={(e) => handleOnDrag(e)}
					onDragEnd={(e) => handleOnDragEnd(e)}
					onDrop={(e) => handleOnDrop(e)}
					onDragOver={(e) => handleOnDragOver(e)}
				>
					{number}
				</StyledDiv>
			))}
		</StyledContainer>
	);
}

export default DragTest;
