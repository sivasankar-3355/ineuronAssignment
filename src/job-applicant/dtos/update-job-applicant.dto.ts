import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateJobApplicantDto{
    @IsDefined()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    role: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsNumber()
    experience: number;
}