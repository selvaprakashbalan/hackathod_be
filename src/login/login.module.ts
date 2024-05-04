import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { empDetails, priority, proEmpMapping, progress, projectDetails, role, taskDetails } from './entities/login.entity';
import { UtilService } from 'src/core/util/util/util.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService,UtilService],
  imports: [
    TypeOrmModule.forFeature([
      role,
      priority,
      progress,
      empDetails,
      projectDetails,
      proEmpMapping,
      taskDetails,
    ])
  ]
})
export class LoginModule {
}
