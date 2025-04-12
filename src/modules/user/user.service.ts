import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    await this.validateCreateUser(createUserDTO);

    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

    const user = this.userRepository.create({
      email: createUserDTO.email,
      password: hashedPassword,
      phoneNumber: createUserDTO.phoneNumber,
      firstName: createUserDTO.firstName,
      lastName: createUserDTO.lastName,
    });

    return this.userRepository.save(user);
  }

  private async validateCreateUser(createUserDTO: CreateUserDTO): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDTO.email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail already registered');
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
