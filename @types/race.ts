export type ResultProps = {
	command?: string;
	rowCount?: number;
	oid?: number | null;
	rows?: DriverResultProps[];
	feilds?: Array<object>;
	rowAsArray?: boolean;
	status?: string;
};

export type DriverResultProps = {
	number?: string;
	driverid?: string;
	constructorid?: string;
	rowCount?: number;
	oid?: number | null;
	// rows?: Array<object>;
	rows?: DriverResultProps[];
	feilds?: Array<object>;
	rowAsArray?: boolean;
	status?: string;
};

export interface IDriverRows {
	driverid: number;
	driverref: string;
	number: string;
	code: string;
	forename: string;
	surname: string;
	dob: string;
	nationality: string;
	url: string;
}

export interface IFeilds {
	name: string;
	tableID: number;
	columnID: number;
	dataTypeID: number;
	dataTypeSize: number;
	dataTypeModifier: number;
	format: string;
}

export type DriverResponse = {
	command?: string;
	rowCount?: number;
	oid?: number | null;
	rows?: Array<IDriverRows>;
	feilds?: IFeilds[];
	rowAsArray?: boolean;
	RowCtor?: number | null;
};

export interface IConstructorRows {
	constructorid: number;
	constructorref: string;
	name: string;
	nationality: string;
	url: string;
}

export type ConstructorResponse = {
	command?: string;
	rowCount?: number;
	oid?: number | null;
	rows?: IConstructorRows[];
	feilds?: IFeilds[];
	rowAsArray?: boolean;
	RowCtor?: number | null;
};

export type FiaContextType = {
	drivers?: DriverResponse;
	constructors?: ConstructorResponse;
};

export interface IDnfArray {
	number?: string | undefined;
	dnfStatus?: boolean;
}
