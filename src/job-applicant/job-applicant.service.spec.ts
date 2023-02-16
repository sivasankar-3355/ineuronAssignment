import {Test, TestingModule} from '@nestjs/testing'
import * as sinon from 'sinon'
import { JobApplicantService } from './job-applicant.service'
import { JobApplicant } from './job-applicant.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { JobApplicantDto } from './dtos/job-applicant-dto.dto'
import { UpdateJobApplicantDto } from './dtos/update-job-applicant.dto'


describe('JobApplicantService', () => {
  let jobApplicantService: JobApplicantService;
  let sandbox: sinon.SinonSandbox;

  beforeAll(async () => {
    sandbox = sinon.createSandbox()
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            JobApplicantService,
            {
                provide: getRepositoryToken(JobApplicant),
                useValue: sinon.createStubInstance(Repository)
            }
        ]
    }).compile();
    jobApplicantService = module.get<JobApplicantService>(JobApplicantService)
  })

  it('should call createJobApplicant method with expected params', async () => {
    const createJobApplicantSpy = jest.spyOn(jobApplicantService, 'createJobApplicant')
    const dto = new JobApplicantDto()
    jobApplicantService.createJobApplicant(dto);
    expect(createJobApplicantSpy).toHaveBeenCalledWith(dto)
  })

  it('should call getOneJobApplicant method with expected param', async () => {
    const findOneJObApplicantSpy = jest.spyOn(jobApplicantService, 'getJobApplicant')
    const findOneOptions: FindOneOptions = {}
    jobApplicantService.getJobApplicant(findOneOptions)
    expect(findOneJObApplicantSpy).toHaveBeenCalledWith(findOneOptions)
  })

  it('should call updateJobApplicant method with expected param', async () => {
    const updateJobApplicantSpy = jest.spyOn(jobApplicantService, 'updateJobApplicant')
    const dto = new UpdateJobApplicantDto()
    jobApplicantService.updateJobApplicant(dto)
    expect(updateJobApplicantSpy).toHaveBeenCalledWith(dto)
  })

  it('should call deleteJobApplicant method with expected param', async () => {
    const deleteJobApplicantSpy = jest.spyOn(jobApplicantService, 'deleteJobApplicant')
    const findOneOptions: FindOneOptions = {}
    jobApplicantService.deleteJobApplicant(findOneOptions)
    expect(deleteJobApplicantSpy).toHaveBeenCalledWith(findOneOptions)
  })

  afterAll(async () => {
    sandbox.restore()
  });
})