import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger/dist";
import { JobApplicantDto, OneJobApplicant } from "./dtos/job-applicant-dto.dto";
import { UpdateJobApplicantDto } from "./dtos/update-job-applicant.dto";
import { JobApplicant } from "./job-applicant.entity";
import { JobApplicantService } from "./job-applicant.service";

@ApiTags('Job Applicant CRUD')
@Controller()
export class JobApplicantController{
    constructor(
        private readonly jobApplicantService: JobApplicantService
    ){}

    @ApiOkResponse({
        description: 'Retrieved Job Applicants successfully',
      })
      @ApiNotFoundResponse({ description: 'No Job Applicants to be retrieved' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get('/get')
    async get(){
      try {
        const jobApplicants = await this.jobApplicantService.getAllJobApplicants()

        if(jobApplicants.length != 0) return {is_success: true, job_applicants: jobApplicants}
 
      } catch (error) {
        return {is_success: false, msg: 'No job applicants to be fetched...'}
      }
    }

    @ApiOkResponse({
        description: 'Retrieved Job Applicant successfully',
      })
      @ApiNotFoundResponse({ description: 'No Job Applicant with specified id' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get('/getone/:id')
    async getOne(@Body() body: OneJobApplicant){
       try {
        const jobApplicant = await this.jobApplicantService.getJobApplicant({where: {
          id: Number(body.id)
        }})
        if(Object.keys(jobApplicant).length != 0) return {is_success: true, job_applicant: jobApplicant}
    
       } catch (error) {
          return {is_success: false, msg: 'no applicant with that id...'}
       }
    }

    @ApiOkResponse({
        description: 'Added Job Applicant successfully',
      })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Post('/add')
    async add(@Body() body: JobApplicantDto){
     try {
        const {name, age, role, experience} = body
        const jobApplicant = await this.jobApplicantService.createJobApplicant(body)
  
        if(Object.keys(jobApplicant).length != 0) return {is_success: true, job_applicant: jobApplicant}

     } catch (error) {
        return {is_success: false}
     }

    }

    @ApiOkResponse({
        description: 'Updated Job Applicant successfully',
      })
      @ApiNotFoundResponse({ description: 'No such Job Applicant to be update' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Put('/update')
    async update(@Body() body: UpdateJobApplicantDto){
       try {
        const updatedJobApplicant = await this.jobApplicantService.updateJobApplicant(body)
        if(Object.keys(updatedJobApplicant).length != 0) return {is_success: true}
       } catch (error) {
          return {is_success: false}
       }

    }

    @ApiOkResponse({
        description: 'Deleted Job Applicant successfully',
      })
      @ApiNotFoundResponse({ description: 'No such Job Applicant to be deleted' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Delete('/delete/:id')
    async delete(@Param('id') id: string){
       try {
        await this.jobApplicantService.deleteJobApplicant({
          where: {
            id: Number(id)
          }
        })
        return {is_success: true}
       } catch (error) {
          return {is_success: false}
       }
    }
}