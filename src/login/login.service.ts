import { Injectable } from '@nestjs/common';
import { empDetails, role } from './entities/login.entity';
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

}
