import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { LoggedInDto, LoginDto, RegisterDto, RegisteredDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  public async register(userInfo: RegisterDto): Promise<RegisteredDto> {
    return await this.userService.create(userInfo);
  }

  public async login({ username, password }: LoginDto): Promise<LoggedInDto> {
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException('Your account is incorrect!');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Your account is incorrect!');

    const payload = {
      id: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      data: { accessToken },
    };
  }
}
