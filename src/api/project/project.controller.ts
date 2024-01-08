import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResponseAPI } from 'src/common/dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  AddCollaboratorProject,
  CreateProjectDto,
  ResponseListProject,
  ResponseProject,
  ResponseUserRoleProject,
  UpdateProject,
} from './dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() data: CreateProjectDto,
  ): Promise<ResponseProject> {
    return this.projectService.create(req.user.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add-collaborator')
  addCollaborator(
    @Request() req,
    @Body() data: AddCollaboratorProject,
  ): Promise<ResponseUserRoleProject> {
    return this.projectService.addCollaborator(req.user.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProject(
    @Request() req,
    @Param('id') id: string,
    @Body() data: UpdateProject,
  ): Promise<ResponseProject> {
    return this.projectService.updateProjectById(req.user.id, id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProject(@Request() req, @Param('id') id: string): Promise<ResponseAPI> {
    return this.projectService.deleteProjectById(req.user.id, id);
  }

  @Get()
  getAll(): Promise<ResponseListProject> {
    return this.projectService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getByUserId(@Request() req): Promise<ResponseListProject> {
    return this.projectService.getAllByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/permission/:permission')
  getByUserIdAndAdminPermission(
    @Request() req,
    @Param('permission') permission: number,
  ): Promise<ResponseListProject> {
    return this.projectService.getByUserIdAndPermission(
      req.user.id,
      permission,
    );
  }
}
