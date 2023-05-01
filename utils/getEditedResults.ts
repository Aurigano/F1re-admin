import { DriverResultProps, IDnfArray } from "../@types/race";

export default function getEditedResults(
	resultArray: DriverResultProps[] | undefined | IDnfArray[],
	currentElement: string,
	draggedElement: string
) {
	const copyArray = [...(resultArray ?? [])];
	console.log(copyArray, currentElement, draggedElement);
	const currentElementIndex = copyArray?.findIndex(
		(driver) => driver?.number === currentElement
	);
	const draggedElementIndex = copyArray?.findIndex(
		(driver) => driver?.number === draggedElement
	);
	console.log(currentElementIndex, draggedElementIndex);

	// swapping elements
	const temp = copyArray[currentElementIndex];
	copyArray[currentElementIndex] = copyArray[draggedElementIndex];
	copyArray[draggedElementIndex] = temp;

	return copyArray;
}
