import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginUserDTO): Promise<{ access_token: string }> {
    await this.authService.validateUser(body);

    return this.authService.login(body);
  }
}
