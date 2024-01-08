import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseAPI } from 'src/common/dto';
import { PermissionProject } from 'src/common/enum';
import { Repository } from 'typeorm';
import { UserRoleProjectService } from '../user-role-project/user-role-project.service';
import { UserService } from '../user/user.service';
import {
  AddCollaboratorProject,
  CreateProjectDto,
  ResponseListProject,
  ResponseProject,
  ResponseUserRoleProject,
  UpdateProject,
} from './dto';
import { Project } from './entities';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
    private readonly userRoleProjectService: UserRoleProjectService,
  ) {}

  async create(
    userId: string,
    data: CreateProjectDto,
  ): Promise<ResponseProject> {
    const user = await this.userService.getDetailsById(userId);

    if (!user) throw new BadRequestException('Infomation of user is invalid.');

    const project = await this.projectRepository.save(data);

    await this.userRoleProjectService.create({
      project,
      user,
      permission: PermissionProject.ADMINISTRATOR,
    });

    const projectDetails = await this.getDetailsById(project.id);

    return {
      status: 200,
      message: 'Create project success',
      data: projectDetails,
    };
  }

  async updateProjectById(
    adminId: string,
    id: string,
    data: UpdateProject,
  ): Promise<ResponseProject> {
    const isAdmin =
      await this.userRoleProjectService.isAdminByUserIdAndProjectId(
        adminId,
        id,
      );

    if (!isAdmin) throw new BadRequestException('No update permissions');

    await this.projectRepository.update(id, data);

    const newProject = await this.getDetailsById(id);

    return {
      status: 200,
      message: 'Update project success',
      data: newProject,
    };
  }

  async addCollaborator(
    adminId: string,
    data: AddCollaboratorProject,
  ): Promise<ResponseUserRoleProject> {
    const isAdmin =
      await this.userRoleProjectService.isAdminByUserIdAndProjectId(
        adminId,
        data.projectId,
      );

    if (!isAdmin) throw new BadRequestException('No update permissions');

    const user = await this.userService.getDetailsById(data.userId);
    const project = await this.getDetailsById(data.projectId);

    const userRoleProject = await this.userRoleProjectService.create({
      user,
      project,
      permission: data.permission,
    });

    return {
      status: 200,
      message: 'Add collaborator to project success',
      data: userRoleProject,
    };
  }

  async deleteProjectById(adminId: string, id: string): Promise<ResponseAPI> {
    const isAdmin =
      await this.userRoleProjectService.isAdminByUserIdAndProjectId(
        adminId,
        id,
      );

    console.log(adminId, id);

    if (!isAdmin) throw new BadRequestException('No delete permissions');

    await this.userRoleProjectService.deleteByProject(id);
    await this.projectRepository.delete(id);

    return {
      status: 200,
      message: 'Delete project complete',
    };
  }

  async getDetailsById(id: string): Promise<Project> {
    return await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.roles', 'roles')
      .leftJoinAndSelect('roles.user', 'user')
      .where('project.id = :id', { id })
      .getOne();
  }

  async getAll(): Promise<ResponseListProject> {
    const listProject = await this.projectRepository.find({
      relations: ['roles', 'roles.user'],
    });

    return {
      status: 200,
      message: 'Get all project success',
      data: listProject,
    };
  }

  async getAllByUserId(userId: string): Promise<ResponseListProject> {
    const listUserRoleProject =
      await this.userRoleProjectService.getByUserId(userId);

    const listProject = listUserRoleProject.map((item) => item.project);

    return {
      status: 200,
      message: 'Get all project by user success',
      data: listProject,
    };
  }

  async getByUserIdAndPermission(
    userId: string,
    permission: PermissionProject,
  ): Promise<ResponseListProject> {
    const listUserRoleProject =
      await this.userRoleProjectService.getByUserIdAndPermission(
        userId,
        permission,
      );

    const listProject = listUserRoleProject.map((item) => item.project);

    return {
      status: 200,
      message: `Get all project by ${PermissionProject[permission]} success`,
      data: listProject,
    };
  }
}
