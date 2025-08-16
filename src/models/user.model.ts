import { User, UserRole } from "@prisma/client";

export class UserModel{
   id: number;
   email: string;
   name: string;
   roleId: number;
   createdAt: Date;
   updatedAt: Date;
   role?: UserRole;

   constructor(user: User, role?: UserRole) {
    this.id = user.id;
    this.email = user.email;
    this.roleId = user.roleId;
    this.name = user.displayName;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.role = role
   }
}