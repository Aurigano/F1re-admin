import { useFia } from "../contexts/fiacontext";
import { DriverResultProps, IConstructorRows } from "../@types/race";

export default function getContructorDetails(
	driverInfo: DriverResultProps
): IConstructorRows[] | undefined {
	const FiaContext = useFia();
	const AllConstructors = FiaContext.constructors?.rows;
	const requiredConstructorID = driverInfo?.constructorid;
	const requiredConstructorDetail = AllConstructors?.filter(
		(constructor) =>
			constructor.constructorid ===
			parseInt(requiredConstructorID ?? "undefined")
	);
	// console.log(FiaContext);
	// console.log(driverInfo);
	return requiredConstructorDetail;
}
