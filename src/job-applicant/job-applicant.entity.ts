import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('job_applicants')
export class JobApplicant{
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   age: number;

   @Column()
   role: string;

   @Column({nullable: true})
   experience: number;
}