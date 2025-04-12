import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginUserDTO } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDTO: LoginUserDTO): Promise<void> {
    const { email, password } = loginUserDTO;

    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  async login(loginUserDTO: LoginUserDTO): Promise<{ access_token: string }> {
    const { email, password } = loginUserDTO;

    const payload = { email, password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
