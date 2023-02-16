import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobApplicantController } from "./job-applicant.controller";
import { JobApplicant } from "./job-applicant.entity";
import { JobApplicantService } from "./job-applicant.service";

@Module({
    imports: [TypeOrmModule.forFeature([JobApplicant])],
    providers: [JobApplicantService],
    controllers: [JobApplicantController],
    exports: [JobApplicantService]
})
export class JobApplicantModule{}