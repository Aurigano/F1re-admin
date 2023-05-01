import { Dispatch, SetStateAction } from "react";
import { styled, withTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { DriverResultProps, IDnfArray } from "../../../@types/race";
import getDriverDetails from "../../../utils/getDriverDetails";
import getContructorDetails from "../../../utils/getConstructorDetails";
import {
	ALFAROMEO,
	ALPHATAURI,
	ALPINE,
	ASTONMARTIN,
	FERRARI,
	HAAS,
	MCLAREN,
	MERCEDES,
	REDBULL,
	WILLIAMS,
} from "../../../utils/constants";
import getConstructorLogoPath from "../../../utils/getConstructorLogoPath";

type PropType = {
	driverInfo: DriverResultProps;
	index: number;
	dnf: IDnfArray[];
	setDnf: Dispatch<SetStateAction<IDnfArray[]>>;
	fastestLap: string | undefined;
	setFastestLap: Dispatch<SetStateAction<string | undefined>>;
	handleOnDrag: (e: React.DragEvent) => void;
	handleOnDrop: (e: React.DragEvent) => void;
	handleOnDragOver: (e: React.DragEvent) => void;
};

const StyledDiv = styled("div")((props) => {
	// console.log(props.theme.palette.mode);
	return `
	display: flex;
	max-width: 1280px;
	margin: 20px;
	border: ${props};
	cursor: move;
	width: max-content;
	.skeleton {
		// margin: 20px;
	}
	.positionDiv {
		width: 85px;
		background: grey;
		margin-right: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 42px;
		font-weight: 600;
		background: ${props.theme.palette.divStyles?.backgroundColor};
		color: ${props.theme.palette.divStyles?.textColor};
}
	}
	.alpine {
		background-color: #FD4BC7;
		// color: #005BA9;
		// color: #0071C2;
		color: #004a7e;
	}
	.haas {
		background-color: #EFEFEF;
		color: #DA291C;
	}
	.williams {
		background-color: #00A3E0;
		color: #041E42;
	}
	.alfaromeo {
		background-color: #A50F2D;
		// color: #004E37;
		// color: #000E22;
		color: #FFF;
	}
	.alphatauri {
		background-color: #041F3D;
		color: #F1F3F4;
	}
	.mclaren {
		background-color: #FF8000;
		color: #000000;
	}
	.astonmartin {
		background-color: #00665E;
		color: #FFFFFF;
	}
	.mercedes {
		background-color: #00A19C;
		color: #FFF;
	}
	.ferrari {
		background-color: #F60000;
		color: #FFF;
	}
	.redbull {
		background-color: #1B2B5A;
		color: #FFEA00;
	}
	.default {
		background-color: #111111;
		color: #F1F3F4;
	}
	.cardDiv {
		width: 500px;
		padding: 10px;
		display: flex;
		align-items: center;
	}
	.logo {
		width: 100px;
		height: 100px;
    	margin-left: auto;
    	object-fit: contain;
	}
	.driverNumber {
		font-size: 42px;
    	font-weight: 600;
		padding: 10px;
		padding-left: 0;
		width: 80px;
		text-align: center;
	}
	.driverName {
		font-size: 24px;
		padding: 10px;
	}
	.extra-attributes {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100px;
		padding-left: 5px;
	}
	.FastestLapDiv {
		cursor: pointer;
		height: 100%;
		width: 100%;
		text-align: center;
		flex: 1;
		background: #633593;
		color: #FFF;
		margin: 0 5px 5px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.NotFastestLapDiv {
		height: 100%;
		width: 100%;
		text-align: center;
		flex: 1;
		background: ${props.theme.palette.divStyles?.backgroundColor};
		color: ${props.theme.palette.divStyles?.textColor};
		margin: 0 5px 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.DNFDiv {
		cursor: pointer;
		height: 100%;
		width: 100%;
		text-align: center;
		flex: 1;
		background: #E04A3A;
		color: #2a0303;
		margin: 0 5px;
	}
	.NotDNFDiv {
		cursor: pointer;
		height: 100%;
		width: 100%;
		text-align: center;
		flex: 1;
		background: ${props.theme.palette.divStyles?.backgroundColor};
		color: ${props.theme.palette.divStyles?.textColor};
		margin: 0 5px;
	}
	.timerWhite {
		fill: #FFF;
		margin-right: 5px;
	}
	.timerGrey {
		fill:  ${props.theme.palette.divStyles?.textColor};
		margin-right: 5px;
	}
`;
});

function DriverCards(props: PropType) {
	const driverInfo = props.driverInfo;
	const {
		handleOnDrag,
		handleOnDrop,
		handleOnDragOver,
		index,
		dnf,
		setDnf,
		fastestLap,
		setFastestLap,
	} = props;

	const driverDetails = getDriverDetails(driverInfo)?.[0];

	const DNFElement = dnf.find(
		(element: IDnfArray) => element.number === driverDetails?.number
	);

	const isDnf: boolean | undefined = DNFElement?.dnfStatus;

	const constructorDetails = getContructorDetails(driverInfo)?.[0];
	const driverNumber = driverDetails?.number;
	const driverName: string =
		driverDetails?.forename + " " + driverDetails?.surname;
	const constructorName = constructorDetails?.name;
	const imagePath = getConstructorLogoPath(constructorDetails?.constructorid);

	function classNameDecider() {
		switch (constructorName) {
			case FERRARI:
				return "ferrari";
			case REDBULL:
				return "redbull";
			case MERCEDES:
				return "mercedes";
			case ASTONMARTIN:
				return "astonmartin";
			case HAAS:
				return "haas";
			case ALPINE:
				return "alpine";
			case ALPHATAURI:
				return "alphatauri";
			case ALFAROMEO:
				return "alfaromeo";
			case MCLAREN:
				return "mclaren";
			case WILLIAMS:
				return "williams";
			default:
				return "default";
		}
	}

	function onFastestLapSet() {
		setFastestLap(driverNumber);
	}

	function onDNFChange() {
		const copyDnf = [...dnf];
		const currentIndex = copyDnf.findIndex(
			(element) => element.number === driverNumber
		);
		copyDnf[currentIndex] = {
			...copyDnf[currentIndex],
			dnfStatus: !isDnf,
		};
		setDnf(copyDnf);
	}

	if (
		driverDetails?.forename === undefined ||
		driverDetails?.surname === undefined
	)
		return (
			<StyledDiv>
				<Skeleton
					className="skeleton"
					animation="wave"
					sx={{ bgcolor: "grey.900" }}
					variant="rectangular"
					width={690}
					height={120}
				/>
			</StyledDiv>
		);

	return (
		<StyledDiv
			id={`${driverNumber}`}
			onDragStart={(e) => handleOnDrag(e)}
			onDrop={(e) => handleOnDrop(e)}
			onDragOver={(e) => handleOnDragOver(e)}
		>
			<div className="positionDiv">{index + 1}</div>
			<div
				id={`${driverNumber}`}
				className={classNameDecider() + " cardDiv"}
				draggable
				onDragStart={(e) => handleOnDrag(e)}
				onDrop={(e) => handleOnDrop(e)}
				onDragOver={(e) => handleOnDragOver(e)}
			>
				<div
					id={`${driverNumber}`}
					className="driverNumber"
					onDragStart={(e) => handleOnDrag(e)}
					onDrop={(e) => handleOnDrop(e)}
					onDragOver={(e) => handleOnDragOver(e)}
				>
					{driverNumber}
				</div>
				<div
					id={`${driverNumber}`}
					className="driverName"
					onDragStart={(e) => handleOnDrag(e)}
					onDrop={(e) => handleOnDrop(e)}
					onDragOver={(e) => handleOnDragOver(e)}
				>
					{driverName}
				</div>
				<img
					id={`${driverNumber}`}
					src={imagePath}
					alt={`${constructorName}-logo`}
					className="logo"
					onDragStart={(e) => handleOnDrag(e)}
					onDrop={(e) => handleOnDrop(e)}
					onDragOver={(e) => handleOnDragOver(e)}
				/>
			</div>
			<div
				className="extra-attributes"
				id={`${driverNumber}`}
				onDragStart={(e) => handleOnDrag(e)}
				onDrop={(e) => handleOnDrop(e)}
				onDragOver={(e) => handleOnDragOver(e)}
			>
				<div
					id={`${driverNumber}`}
					className={
						fastestLap === driverNumber
							? "FastestLapDiv"
							: "NotFastestLapDiv"
					}
					onClick={onFastestLapSet}
					onDragStart={(e) => handleOnDrag(e)}
					onDrop={(e) => handleOnDrop(e)}
					onDragOver={(e) => handleOnDragOver(e)}
				>
					<TimerOutlinedIcon
						className={
							fastestLap === driverNumber
								? "timerWhite"
								: "timerGrey"
						}
					/>
					<p className="secondaryLabel">FL</p>
				</div>
				<div
					id={`${driverNumber}`}
					className={isDnf ? "DNFDiv" : "NotDNFDiv"}
					onClick={onDNFChange}
					onDragStart={(e) => handleOnDrag(e)}
					onDrop={(e) => handleOnDrop(e)}
					onDragOver={(e) => handleOnDragOver(e)}
				>
					<p className="secondaryLabel">DNF</p>
				</div>
			</div>
		</StyledDiv>
	);
}

export default DriverCards;
