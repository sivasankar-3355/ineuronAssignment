import { JobApplicantController } from "./job-applicant.controller"
import { JobApplicantService } from "./job-applicant.service"
import {Test, TestingModule} from '@nestjs/testing'
import { JobApplicantDto, OneJobApplicant } from "./dtos/job-applicant-dto.dto";


describe("JobApplicant Controller unit tests", () => {
    let jobApplicantController: JobApplicantController;
    let spyService: JobApplicantService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: JobApplicantService,
            useFactory: () => ({
               createJobApplicant: jest.fn(() => []),
               getAllJobApplicants: jest.fn(() => []),
               getJobApplicant: jest.fn(() => {}),
               updateJobApplicant: jest.fn(() => {}),
               deleteJobApplicant: jest.fn(() => {}),

            })
        }
        const app: TestingModule = await Test.createTestingModule({
            controllers: [JobApplicantController],
            providers: [JobApplicantService, ApiServiceProvider]
        }).compile()
        jobApplicantController = app.get<JobApplicantController>(JobApplicantController);
        spyService = app.get<JobApplicantService>(JobApplicantService)
    })

    it('calling add method', () => {
        const dto = new JobApplicantDto()
        expect(jobApplicantController.add(dto)).not.toEqual(null)
    })

    it("calling add method", () => {
        const dto = new JobApplicantDto();
        jobApplicantController.add(dto);
        expect(spyService.createJobApplicant).toHaveBeenCalled();
        expect(spyService.createJobApplicant).toHaveBeenCalledWith(dto);
      })
    
      it("calling getAll method", () => {
        jobApplicantController.get();
        expect(spyService.getAllJobApplicants).toHaveBeenCalled();
      })
    
      it("calling find get method", () => {
        const dto = new OneJobApplicant();
        dto.id = '2';
        jobApplicantController.getOne(dto);
        expect(spyService.getJobApplicant).toHaveBeenCalled();
      })
})