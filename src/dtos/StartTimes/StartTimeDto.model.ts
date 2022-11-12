import { StartAddressDto } from "../StartAddresses/StartAddressDto.model";

export type StartTimeDto = {
	id : number;
	addressId : number;
	note : string | undefined;
	name : string | undefined;
	time : Date;
	address : StartAddressDto | undefined;
}