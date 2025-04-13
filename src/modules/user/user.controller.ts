import { Controller, Post, Body, Get, Param, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { UserMapper } from './user.mapper';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const userEntity = await this.userService.create(createUserDTO);

    return UserMapper.toDto(userEntity);
  }

  @Get()
  async findAll(): Promise<UserDTO[]> {
    const users = await this.userService.findAll();
    return users.map(UserMapper.toDto);
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UserDTO> {
    const user = await this.userService.findById(id);
    return UserMapper.toDto(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<UserDTO> {
    const user = await this.userService.update(id, updateUserDTO);
    return UserMapper.toDto(user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
