import {
	FERRARI_NUM,
	REDBULL_NUM,
	MERCEDES_NUM,
	ASTONMARTIN_NUM,
	HAAS_NUM,
	ALPINE_NUM,
	ALPHATAURI_NUM,
	ALFAROMEO_NUM,
	MCLAREN_NUM,
	WILLIAMS_NUM,
} from "./constants";

export default function getConstructorLogoPath(
	constructorid: number | undefined
) {
	switch (constructorid) {
		case FERRARI_NUM:
			return "/AllSets/Ferrari/Ferrari_White.png";
		case REDBULL_NUM:
			return "/AllSets/RedBull/RedBull_Logo.png";
		case MERCEDES_NUM:
			return "/AllSets/Mercedes/MercedesWhite.png";
		case ASTONMARTIN_NUM:
			return "/AllSets/AstonMartin/Aston_Martin_White.png";
		case HAAS_NUM:
			return "/AllSets/Haas/Haas_Logo.png";
		case ALPINE_NUM:
			return "/AllSets/Alpine/Alpine-Logo.png";
		case ALPHATAURI_NUM:
			return "/AllSets/AlphaTauri/Scuderia_AlphaTauri_White.svg.png";
		case ALFAROMEO_NUM:
			return "/AllSets/AlfaRomeo/AlfaRomeoWhite.png";
		case MCLAREN_NUM:
			return "/AllSets/McLaren/McLaren_Black.svg.png";
		case WILLIAMS_NUM:
			return "/AllSets/Williams/Williams_Secondary.png";
		default:
			return "/AllSets/F1.png";
	}
}
