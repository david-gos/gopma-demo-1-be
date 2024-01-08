import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionProject } from 'src/common/enum';
import { DeleteResult, Repository } from 'typeorm';
import {
  CreateUserRoleProjectDto,
  ResponseDeleteUserRoleProject,
  ResponseUpdatedUserRoleProject,
  UpdateUserRoleProject,
  UserRoleProjectDto,
} from './dto';
import { UserRoleProject } from './entities';

@Injectable()
export class UserRoleProjectService {
  constructor(
    @InjectRepository(UserRoleProject)
    private readonly userRoleProjectRepository: Repository<UserRoleProject>,
  ) {}

  public async create(
    data: CreateUserRoleProjectDto,
  ): Promise<UserRoleProjectDto> {
    const isPermissionExisted = await this.getByUserIdAndProjectId(
      data.user.id,
      data.project.id,
    );

    if (isPermissionExisted) {
      throw new BadRequestException('User role existed in this project');
    }

    await this.userRoleProjectRepository.save(data);

    const userRoleProject = await this.getByUserIdAndProjectId(
      data.user.id,
      data.project.id,
    );

    return userRoleProject;
  }

  public async updateUserRoleProject(
    adminId: string,
    id: string,
    data: UpdateUserRoleProject,
  ): Promise<ResponseUpdatedUserRoleProject> {
    const getPermission = await this.getByIdWithRelations(id);
    const isAdmin = await this.isAdminByUserIdAndProjectId(
      adminId,
      getPermission.project.id,
    );

    if (!isAdmin) throw new BadRequestException('No update permissions');

    const newUserRoleProject = {
      ...getPermission,
      permission: data.permission,
    };

    await this.userRoleProjectRepository.update(
      getPermission.id,
      newUserRoleProject,
    );

    return {
      status: 200,
      message: 'Update user role in project success',
      data: newUserRoleProject,
    };
  }

  async getByIdWithRelations(id: string): Promise<UserRoleProjectDto> {
    try {
      const userRoleProject = await this.userRoleProjectRepository
        .createQueryBuilder('urp')
        .leftJoinAndSelect('urp.user', 'user')
        .leftJoinAndSelect('urp.project', 'project')
        .where('urp.id = :id', { id })
        .getOne();

      if (!userRoleProject) {
        throw new NotFoundException('User role project not found');
      }

      return userRoleProject;
    } catch (error) {
      throw new NotFoundException('User role project not found');
    }
  }

  async getByUserIdAndProjectId(
    userId: string,
    projectId: string,
  ): Promise<UserRoleProjectDto> {
    try {
      const userRoleProjects = await this.userRoleProjectRepository
        .createQueryBuilder('urp')
        .where('urp.user.id = :userId', { userId })
        .andWhere('urp.project.id = :projectId', { projectId })
        .getOne();
      console.log(userRoleProjects);

      if (!userRoleProjects)
        throw new NotFoundException('User role projects not found');

      return userRoleProjects;
    } catch (error) {
      throw new NotFoundException('User role projects not found');
    }
  }

  async getByUserId(userId: string): Promise<UserRoleProjectDto[]> {
    try {
      const userRoleProjects = await this.userRoleProjectRepository
        .createQueryBuilder('urp')
        .leftJoinAndSelect('urp.project', 'project')
        .leftJoinAndSelect('project.roles', 'roles')
        .leftJoinAndSelect('roles.user', 'userRoles')
        .where('urp.user.id = :userId', { userId })
        .getMany();

      return userRoleProjects;
    } catch (error) {
      throw new NotFoundException('User role projects not found');
    }
  }

  async getByUserIdAndPermission(
    userId: string,
    permission: PermissionProject,
  ): Promise<UserRoleProjectDto[]> {
    try {
      const userRoleProjects = await this.userRoleProjectRepository
        .createQueryBuilder('urp')
        .leftJoinAndSelect('urp.project', 'project')
        .leftJoinAndSelect('project.roles', 'roles')
        .leftJoinAndSelect('roles.user', 'userRoles')
        .where('urp.user.id = :userId', { userId })
        .andWhere('urp.permission = :permission', { permission })
        .getMany();

      return userRoleProjects;
    } catch (error) {
      throw new NotFoundException('User role projects not found');
    }
  }

  public async findAll() {
    return await this.userRoleProjectRepository.find({
      relations: { user: true, project: true },
    });
  }

  public async deleteById(
    adminId: string,
    id: string,
  ): Promise<ResponseDeleteUserRoleProject> {
    const getPermission = await this.getByIdWithRelations(id);
    const isAdmin = await this.isAdminByUserIdAndProjectId(
      adminId,
      getPermission.project.id,
    );

    if (!isAdmin) throw new BadRequestException('No delete permissions');

    const deleteUserRoleProject = await this.userRoleProjectRepository.delete({
      id,
    });

    return {
      status: 200,
      message: 'Delete user role in project success',
      data: deleteUserRoleProject,
    };
  }

  public async deleteByProject(projectId: string): Promise<DeleteResult> {
    const deleteUserRoleProjects = await this.userRoleProjectRepository
      .createQueryBuilder()
      .delete()
      .from(UserRoleProject)
      .where('project.id = :projectId', { projectId })
      .execute();

    return deleteUserRoleProjects;
  }

  public async isAdminByUserRoleProjecrId(id: string): Promise<boolean> {
    const userRoleProject = await this.userRoleProjectRepository.findOneBy({
      id,
    });

    return (
      !userRoleProject ||
      userRoleProject.permission !== PermissionProject.ADMINISTRATOR
    );
  }

  public async isAdminByUserIdAndProjectId(
    userId: string,
    projectId: string,
  ): Promise<boolean> {
    const isAdmin = await this.getByUserIdAndProjectId(userId, projectId);

    return isAdmin && isAdmin.permission === PermissionProject.ADMINISTRATOR;
  }
}
