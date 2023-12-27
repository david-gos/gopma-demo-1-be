import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto, CreatedUserDto, GotUserDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  getProfile(@Request() req): Promise<GotUserDto> {
    return this.userService.getDetailsById(req.user.id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<GotUserDto> {
    return this.userService.getDetailsById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<string> {
    await this.userService.deleteById(id);

    return id;
  }
}
