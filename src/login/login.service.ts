import { Injectable } from '@nestjs/common';
import { empDetails, proEmpMapping, projectDetails, role } from './entities/login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { roleList } from 'src/core/variables/enum';


@Injectable()


export class LoginService {

  constructor(

    @InjectRepository(role)
    private  roleRepo: Repository<role>,

    @InjectRepository(empDetails)
    private  empDetailsRepo: Repository<empDetails>,

    @InjectRepository(projectDetails)
    private  projectDetailsRepo: Repository<projectDetails>,

    @InjectRepository(proEmpMapping)
    private  proEmpMappingRepo: Repository<proEmpMapping>,

  ) { }


  async getMasterList() {
    const pmoList = await this.empDetailsRepo.createQueryBuilder('emp')
     .select([
      'emp.id as id',
      'emp.name as name',
    ])
    .where('emp.roleId = :roleId', { roleId : roleList.pmo })
    .andWhere('emp.isActive = true')
    .getRawMany();

    const tLList = await this.empDetailsRepo.createQueryBuilder('emp')
     .select([
      'emp.id as id',
      'emp.name as name',
    ])
    .where('emp.roleId = :roleId', { roleId : roleList.teamLead })
    .andWhere('emp.isActive = true')
    .getRawMany();

    const empList = await this.empDetailsRepo.createQueryBuilder('emp')
    .select([
        'emp.id as id',
        'CONCAT(emp.name, " - ", emp.designation) as name'
    ])
    .where('emp.roleId = :roleId', { roleId: roleList.employee })
    .andWhere('emp.isActive = true')
    .getRawMany();

    return {
      pmoList,
      tLList,
      empList
    } 
  }

  async getLoginData(email: string) {
    return await this.empDetailsRepo.createQueryBuilder('emp')
    .select([
      'emp.name as name',
      'emp.password as pass',
      'emp.roleId as roleId',
    ])
    .where('emp.email = :email', { email })
    .andWhere('emp.isActive = true')
    .getRawOne();
  }

  async saveProjectDetails(proData) {
     return await this.projectDetailsRepo.save(proData)
  }

  async saveEmployeeDetails(empData) {
    return await this.proEmpMappingRepo.save(empData)
  }

  async getProjectDetails() {
    return await this.projectDetailsRepo.createQueryBuilder('pro')
      .innerJoin(proEmpMapping, 'pem', 'pem.proId = pro.id')
      .innerJoin(empDetails, 'emp', 'emp.id = pro.tlId')
      .select([
        'pro.id as id',
        'pro.proName as proName',
        'pro.startDate as startDate',
        'pro.endDate as dueDate',
        'pro.tlId as tlId',
        'emp.name as tlName',
        'pro.pmoId as pmoId',
      ])
      .addSelect(subQuery => {
        return subQuery
          .select('JSON_ARRAYAGG(pem.empId)', 'empId')
          .from(proEmpMapping, 'pem')
          .where('pem.proId = pro.id');
      }, 'empId')
      .addSelect(subQuery => {
        return subQuery
          .innerJoin(empDetails,'emp','emp.id = pro.pmoId')
          .select('emp.name')
          .from(projectDetails, 'pro')
          .where('pem.proId = pro.id')
      }, 'pmoName')
      .groupBy('pro.id')
      .getRawMany();
  }

}
