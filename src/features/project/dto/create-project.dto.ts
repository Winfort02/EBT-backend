import { ProjectStatus } from "@prisma/client";
import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    project: string;
    @IsString()
    client: string;
    @IsString()
    location: string;
    @IsDate()
    startDate: Date;
    @IsDate()
    endDate: Date;
    @IsNumber()
    budget: number;
    @IsEnum(ProjectStatus)
    status: ProjectStatus
}