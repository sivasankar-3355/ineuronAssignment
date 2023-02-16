import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobApplicant } from "./job-applicant.entity";

export class JobApplicantService{
    constructor(
        @InjectRepository(JobApplicant)
        private readonly jobApplicantRepository: Repository<JobApplicant>
    ){}

    createJobApplicant(_name: string, _age: number, _role: string, _experience: number|undefined){
      const newJobApplicant = this.jobApplicantRepository.create({
        name: _name,
        age: _age,
        role: _role,
        ...(_experience && {experience: _experience})
      })
      return this.jobApplicantRepository.save(newJobApplicant)
    }

    getAllJobApplicants(){
        return this.jobApplicantRepository.find()
    }

    getJobApplicant(_id: number){
        return this.jobApplicantRepository.findOneBy({
            id: _id
        })
    }

    updateJobApplicant(_data: Partial<JobApplicant>){
       return this.jobApplicantRepository.update({id: _data.id}, {..._data})
    }

    deleteJobApplicant(_id: number){
        return this.jobApplicantRepository.delete({id: _id})
    }
}