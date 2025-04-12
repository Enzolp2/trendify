import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { UserMapper } from './user.mapper';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const userEntity = await this.userService.create(createUserDTO);

    return UserMapper.toDto(userEntity);
  }
}
