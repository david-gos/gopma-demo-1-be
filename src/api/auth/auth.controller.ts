import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoggedInDto, LoginDto, RegisterDto, RegisteredDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() user: LoginDto): Promise<LoggedInDto> {
    return await this.authService.login(user);
  }

  @Post('/register')
  async register(@Body() userInfo: RegisterDto): Promise<RegisteredDto> {
    return await this.authService.register(userInfo);
  }
}
