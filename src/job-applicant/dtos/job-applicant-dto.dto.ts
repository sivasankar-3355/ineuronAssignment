import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class JobApplicantDto{
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsNumber()
    age: number;

    @IsDefined()
    @IsString()
    role: string;

    @IsOptional()
    @IsNumber()
    experience: number;
}


