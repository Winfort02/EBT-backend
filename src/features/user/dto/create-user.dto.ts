import { IsEmail, IsInt, IsString } from "class-validator";

export class CreateUserDto {

   @IsString()
   @IsEmail()
   email: string;

   @IsString()
   displayName: string;

   @IsInt()
   roleId: number;

   @IsString()
   password: string;
}
