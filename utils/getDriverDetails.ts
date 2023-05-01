import { useFia } from "../contexts/fiacontext";
import { DriverResultProps, IDriverRows } from "../@types/race";

export default function getDriverDetails(
	driverInfo: DriverResultProps
): IDriverRows[] | undefined {
	const FiaContext = useFia();
	const AllDrivers = FiaContext.drivers?.rows;
	const requiredDriverID = driverInfo?.driverid;
	const requiredDriverDetail = AllDrivers?.filter(
		(driver) =>
			driver.driverid === parseInt(requiredDriverID ?? "undefined")
	);

	return requiredDriverDetail;
}
