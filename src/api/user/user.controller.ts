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

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateUserDto,
  CreatedUserDto,
  GotUserDto,
  ResponseUserProfile,
  UpdateUserProfileDto,
} from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<CreatedUserDto> {
    const createdUser = await this.userService.create(data);

    return createdUser;
  }

  @Get()
  async getAll(): Promise<GotUserDto[]> {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<ResponseUserProfile> {
    return this.userService.getUserInfo(req.user.id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<GotUserDto> {
    return this.userService.getDetailsById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  async updateUser(
    @Body() data: UpdateUserProfileDto,
    @Request() req,
  ): Promise<ResponseUserProfile> {
    return this.userService.updateUserProfileById(req.user.id, data);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<string> {
    await this.userService.deleteById(id);

    return id;
  }
}
