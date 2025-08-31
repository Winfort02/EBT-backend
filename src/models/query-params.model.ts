import { Type } from "class-transformer";
import { IsDate, IsDateString, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryParams {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number = 10;
    @IsOptional()
    @IsString()
    search?: string;
    @IsOptional()
    @IsDate()
    start?: Date | string;
    @IsOptional()
    @IsDate()
    end?: Date | string;
}