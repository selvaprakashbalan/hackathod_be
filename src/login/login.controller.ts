import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res} from '@nestjs/common';
import { LoginService } from './login.service';
import { Request, Response } from 'express';
import { UtilService } from 'src/core/util/util/util.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { roleList } from 'src/core/variables/enum';

@Controller('login')
@ApiBearerAuth()
@ApiTags('login')

export class LoginController {
  constructor(
    private loginService: LoginService,
    private utilService: UtilService
    ) {}

  @Get('getMasterList')
  async getMasterList(@Req() req: Request, @Res() res: Response) {
  const logger = this.utilService.createLogger(LoginController.name);
  try {
    const data = await this.loginService.getMasterList();
    logger.info('Get master list successfully');
    res.status(HttpStatus.OK).json({
      status: true,
      message: 'Get master list successfully',
      data: data,
    });
  } catch (err) {
    console.error('Error in getMasterList:', err);
    logger.error(`something went error${JSON.stringify(err)}`);
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      status: false,
      message: 'something went error',
      error: err.message,
    });
  }
}
@Post('login')
async login(@Req() req: Request, @Res() res: Response, @Body() loginData: any) {
  const logger = this.utilService.createLogger(LoginController.name);
  try {
    const data = await this.loginService.getLoginData(loginData.email);
    const empData = [
      {
        id: data.id,
        name: data.name,
        roleId: data.roleId,
      }
    ]
    if (data.pass === loginData.pass) {
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Login successfully',
        data: empData,
      });
      logger.info('Login successfully');
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        status: false,
        message: 'Incorrect email or password',
      });
    }
  } catch (err) {
    console.error('Error in Login:', err);
    logger.error(`Something went wrong: ${err.message}`);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: 'Internal server error',
    });
  }
}

  @Post('projectSaveData')
  async projectSaveData(@Req() req: Request, @Res() res: Response, @Body() projectSaveData: any) {
    const logger = this.utilService.createLogger(LoginController.name);
    try {
      const proData = [
        {
          proName: projectSaveData.proName,
          startDate: projectSaveData.startDate,
          endDate: projectSaveData.dueDate,
          tlId: projectSaveData.tlId,
          pmoId: projectSaveData.pmoId
        }
      ]
      let savedProject = await this.loginService.saveProjectDetails(proData);
      console.log('savedProject', savedProject);
      let empData = [];

      projectSaveData.empId.forEach(empId => {
        empData.push({
          proId: savedProject[0].id,
          empId: empId
        });
      });

      console.log('empData', empData);
      const savedEmployee = await this.loginService.saveEmployeeDetails(empData);

      logger.info('Project data save successfully');
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Project data save successfully',
      });
    } catch (err) {
      console.error('Error in projectSaveData:', err);
      logger.error(`Something went wrong: ${err.message}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: 'Internal server error',
      });
    }

  }

  @Get('getProjectDetails')
  async getProjectDetails(@Req() req: Request, @Res() res: Response) {
  const logger = this.utilService.createLogger(LoginController.name);
  try {
    const data = await this.loginService.getProjectDetails();
    logger.info('Get project list successfully');
    res.status(HttpStatus.OK).json({
      status: true,
      message: 'Get project list successfully',
      data: data,
    });
  } catch (err) {
    console.error('Error in getProjectDetails:', err);
    logger.error(`something went error${JSON.stringify(err)}`);
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      status: false,
      message: 'something went error',
      error: err.message,
    });
  }
}

  @Get('getPmoProjectDetails/:id')
  async getPmoProjectDetails(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    const logger = this.utilService.createLogger(LoginController.name);
    try {
      const data = await this.loginService.getPmoProjectDetails(id);
      logger.info('Get pmo project list successfully');
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Get pom project list successfully',
        data: data,
      });
    } catch (err) {
      console.error('Error in getPmoProjectDetails:', err);
      logger.error(`something went error${JSON.stringify(err)}`);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'something went error',
        error: err.message,
      });
    }
  }

  @Get('getTeamDetails/:id')
  async getTeamDetails(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    const logger = this.utilService.createLogger(LoginController.name);
    try {
      const data = await this.loginService.getTeamDetails(id);
      logger.info('Get team details successfully');
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Get team details successfully',
        data: data,
      });
    } catch (err) {
      console.error('Error in getTeamDetails:', err);
      logger.error(`something went error${JSON.stringify(err)}`);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'something went error',
        error: err.message,
      });
    }
  }

  @Get('getPriorityList')
  async getPriorityList(@Req() req: Request, @Res() res: Response) {
    const logger = this.utilService.createLogger(LoginController.name);
    try {
      const data = await this.loginService.getPriorityList();
      logger.info('Get priority list successfully');
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Get priority list successfully',
        data: data,
      });
    } catch (err) {
      console.error('Error in getPriorityList:', err);
      logger.error(`something went error${JSON.stringify(err)}`);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'something went error',
        error: err.message,
      });
    }
  }

  @Post('taskSaveData')
  async taskSaveData(@Req() req: Request, @Res() res: Response, @Body() taskData: any) {
    const logger = this.utilService.createLogger(LoginController.name);
    try {
      const data = await this.loginService.taskSaveData(taskData);
      logger.info('Save task details successfully');
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Task assigned successfully',
        data: data,
      });
    } catch (err) {
      console.error('Error in taskSaveData:', err);
      logger.error(`something went error${JSON.stringify(err)}`);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'something went error',
        error: err.message,
      });
    }
  }

  @Get('getTaskDetails/:id')
  async getTaskDetails(@Req() req: Request, @Res() res: Response, @Param('id') id: number){
  const logger = this.utilService.createLogger(LoginController.name);
  try {
    const data = await this.loginService.getTaskDetails(id);
    logger.info('Get task list successfully');
    res.status(HttpStatus.OK).json({
      status: true,
      message: 'Get task list successfully',
      data: data,
    });
  } catch (err) {
    console.error('Error in getTaskDetails:', err);
    logger.error(`something went error${JSON.stringify(err)}`);
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      status: false,
      message: 'something went error',
      error: err.message,
    });
  }
}

  @Get('getEmpProjectDetails/:id')
  async getEmpProjectDetails(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    const logger = this.utilService.createLogger(LoginController.name);
    try {
      const data = await this.loginService.getEmpProjectDetails(id);
      logger.info('Get employee project list successfully');
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Get employee project list successfully',
        data: data,
      });
    } catch (err) {
      console.error('Error in getEmpProjectDetails:', err);
      logger.error(`something went error${JSON.stringify(err)}`);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'something went error',
        error: err.message,
      });
    }
  }

  @Get('getEmpTaskDetails/:id/:proId')
  async getEmpTaskDetails(@Req() req: Request, @Res() res: Response, @Param('id') id: number, @Param('proId') proId: number ) {
    const logger = this.utilService.createLogger(LoginController.name);
    try {
      const data = await this.loginService.getEmpTaskDetails(id,proId);
      logger.info('Get employee task list successfully');
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Get employee task list successfully',
        data: data,
      });
    } catch (err) {
      console.error('Error in getEmpTaskDetails:', err);
      logger.error(`something went error${JSON.stringify(err)}`);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'something went error',
        error: err.message,
      });
    }
  }

  @Get('saveProgressId/:id')
  async saveProgressId(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    const logger = this.utilService.createLogger(LoginController.name);
    try {
      const data = await this.loginService.saveProgressId(id);
      logger.info('Task completed');
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Task completed',
        data: data,
      });
    } catch (err) {
      console.error('Error in saveProgressId:', err);
      logger.error(`something went error${JSON.stringify(err)}`);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'something went error',
        error: err.message,
      });
    }
  }





}
