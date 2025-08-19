import { IsString } from "class-validator";

export class CreatePersonDto {
    @IsString()
    fullName: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    address: string;

}