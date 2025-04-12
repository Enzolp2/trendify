import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  lastName: string | null;
}
