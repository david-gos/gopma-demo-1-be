import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import {
  CreateUserDto,
  CreatedUserDto,
  GotUserDto,
  ResponseUserProfile,
} from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(data: CreateUserDto): Promise<CreatedUserDto> {
    const { email, phone } = data;

    const user = await this.userRepository.findOneBy([{ email }, { phone }]);

    if (user) {
      throw new BadRequestException(
        'User with that email or phone already exists.',
      );
    }

    const createdUser = this.userRepository.create(data);
    await this.userRepository.save(data);

    return createdUser.toResponse();
  }

  public async getUserInfo(id: string): Promise<ResponseUserProfile> {
    const user = await this.getDetailsById(id);

    if (!user) throw new BadRequestException('Infomation of user is invalid.');

    return {
      status: 200,
      message: 'Get profile success',
      data: user.toResponse(),
    };
  }

  public async updateUserById(
    id: string,
    data: UpdateUserDto,
  ): Promise<ResponseUserProfile> {
    const user = await this.getDetailsById(id);
    const { phone, password } = data;

    if (phone && phone !== user?.phone) {
      const existedUser = await this.findOneByUsername(phone);

      if (existedUser) {
        throw new BadRequestException('User with that phone already exists.');
      }
    }

    await this.userRepository.update(id, {
      ...data,
      password: password ? await bcrypt.hash(password, 10) : user.password,
    });

    const newUser = await this.getDetailsById(id);

    return {
      status: 200,
      message: 'Update profile success',
      data: newUser.toResponse(),
    };
  }

  public async getAll(): Promise<GotUserDto[]> {
    return await this.userRepository.find();
  }

  public async getDetailsById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  public async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy([
      { email: username },
      { phone: username },
    ]);
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ id });
  }
}
