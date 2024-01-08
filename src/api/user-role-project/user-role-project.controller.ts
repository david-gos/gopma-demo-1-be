import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserRoleProject } from './dto';
import {
  ResponseDeleteUserRoleProject,
  ResponseUpdatedUserRoleProject,
} from './dto/got-user-role-project.dto';
import { UserRoleProjectService } from './user-role-project.service';

@Controller('permission')
export class UserRoleProjectController {
  constructor(
    private readonly userRoleProjectService: UserRoleProjectService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUserRoleProject(
    @Body() data: UpdateUserRoleProject,
    @Request() req,
    @Param('id') id: string,
  ): Promise<ResponseUpdatedUserRoleProject> {
    return await this.userRoleProjectService.updateUserRoleProject(
      req.user.id,
      id,
      data,
    );
  }

  @Get()
  async getAll() {
    return this.userRoleProjectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUserRolePeoject(
    @Request() req,
    @Param('id') id: string,
  ): Promise<ResponseDeleteUserRoleProject> {
    return await this.userRoleProjectService.deleteById(req.user.id, id);
  }
}
