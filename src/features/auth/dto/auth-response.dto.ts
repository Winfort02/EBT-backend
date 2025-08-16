import { UserModel } from "src/models/user.model";

export class AuthResponseDto {
   user: UserModel;
   accessToken: string;

   constructor(user: UserModel, accessToken: string) {
      this.user = user;
      this.accessToken = accessToken
   }
}