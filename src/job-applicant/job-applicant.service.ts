import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { JobApplicantDto } from "./dtos/job-applicant-dto.dto";
import { UpdateJobApplicantDto } from "./dtos/update-job-applicant.dto";
import { JobApplicant } from "./job-applicant.entity";

export class JobApplicantService{
    constructor(
        @InjectRepository(JobApplicant)
        private readonly jobApplicantRepository: Repository<JobApplicant>
    ){}

    createJobApplicant(body: JobApplicantDto){
        const {name, age, role, experience} = body
      const newJobApplicant = this.jobApplicantRepository.create({
        name: name,
        age: age,
        role: role,
        ...(experience && {experience: experience})
      })
      return this.jobApplicantRepository.save(newJobApplicant)
    }

    getAllJobApplicants(){
        return this.jobApplicantRepository.find()
    }

    getJobApplicant(findOneOptions: FindOneOptions<JobApplicant>){
        return this.jobApplicantRepository.findOne(findOneOptions)
    }

    updateJobApplicant(_data: UpdateJobApplicantDto){
       return this.jobApplicantRepository.update({id: _data.id}, {..._data})
    }

    async deleteJobApplicant(findOneOptions: FindOneOptions<JobApplicant>){
        const jobApplicant = await this.jobApplicantRepository.findOne(findOneOptions)
        return this.jobApplicantRepository.delete(jobApplicant)
    }
}