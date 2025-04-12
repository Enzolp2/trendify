import { UserDTO } from './dto/user.dto';
import { UserEntity } from './user.entity';

export class UserMapper {
  static toDto(entity: UserEntity): UserDTO {
    const dto = new UserDTO();

    dto.id = entity.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.email = entity.email;
    dto.phoneNumber = entity.phoneNumber;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;

    return dto;
  }

  static toEntity(dto: UserDTO): UserEntity {
    const entity = new UserEntity();

    entity.id = dto.id;
    entity.email = dto.email;
    entity.phoneNumber = dto.phoneNumber;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    return entity;
  }
}
