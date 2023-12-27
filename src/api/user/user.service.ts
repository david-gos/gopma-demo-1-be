import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities';
import { CreateUserDto, CreatedUserDto, GotUserDto } from './dto';

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

  public async getAll(): Promise<GotUserDto[]> {
    return await this.userRepository.find();
  }

  public async getDetailsById(id: string): Promise<GotUserDto> {
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
